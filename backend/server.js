const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const http = require('http');
const axios = require('axios');
const Razorpay = require('razorpay');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Validate critical environment variables
if (process.env.NODE_ENV === 'production') {
  if (!process.env.MONGODB_URI) {
    console.error('CRITICAL: MONGODB_URI not found');
    process.exit(1);
  }
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.error('CRITICAL: Razorpay credentials not found');
    process.exit(1);
  }
}

// CREATE UPLOADS DIRECTORY IF IT DOESN'T EXIST
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// CONFIGURE MULTER FOR FILE UPLOADS
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
    'video/mp4', 'video/mov', 'video/avi', 'video/mkv', 'video/webm', 'video/3gp'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images and videos are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 4 * 1024 * 1024 * 1024,
  }
});

// FIXED CORS CONFIGURATION
const corsOriginHandler = (origin, callback) => {
  console.log('CORS request from origin:', origin);
  
  if (!origin) {
    console.log('CORS allowed for request with no origin');
    return callback(null, true);
  }
  
  const allowedOrigins = process.env.NODE_ENV === 'production' 
    ? [
        "https://ehtecounseling.com",
        "https://www.ehtecounseling.com",
        process.env.FRONTEND_URL,
        "https://support-app-2.vercel.app",
      ].filter(Boolean)
    : ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"];
  
  const isVercelPreview = origin.match(/^https:\/\/support-app-2-[a-zA-Z0-9-]+.*\.vercel\.app$/);
  
  if (allowedOrigins.includes(origin) || isVercelPreview) {
    console.log('CORS allowed for origin:', origin);
    callback(null, true);
  } else {
    console.log('CORS blocked origin:', origin);
    callback(null, true);
  }
};

// ENHANCED CORS MIDDLEWARE
app.use(cors({
  origin: corsOriginHandler,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Cache-Control',
    'Pragma'
  ],
  optionsSuccessStatus: 204
}));

// EXPLICIT OPTIONS HANDLERS
app.options('*', cors({
  origin: corsOriginHandler,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'Cache-Control', 'Pragma']
}));

// PREFLIGHT DEBUGGING MIDDLEWARE
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS preflight for:', req.path);
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Origin, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

// Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: corsOriginHandler,
    credentials: true
  }
});

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secure-jwt-secret-change-in-production';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/support-app';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

// Admin Schema
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'admin'
  },
  pushToken: {
    type: String,
    default: null
  },
  deviceType: {
    type: String,
    default: null
  },
  lastTokenUpdate: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Admin = mongoose.model('Admin', adminSchema);

// Rating Schema
const ratingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  feedback: {
    type: String,
    default: ''
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

// Chat Message Schema with File Support
const chatMessageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ['user', 'admin'],
    required: true
  },
  message: {
    type: String,
    default: ''
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'video'],
    default: 'text'
  },
  file: {
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    url: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const meetingLinksSchema = new mongoose.Schema({
  googleMeet: String,
  zoom: String,
  userGoogleMeet: String,
  userZoom: String
});

// FIXED Message Schema
const messageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: 'Anonymous'
  },
  isAnonymous: {
    type: Boolean,
    default: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'in-chat', 'in-call', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid'],
    default: 'unpaid'
  },
  paymentId: String,
  amountPaid: Number,
  paidAt: Date,
  chatMessages: [chatMessageSchema],
  meetingLinks: meetingLinksSchema,
  callNotificationSent: {
    type: Boolean,
    default: false
  },
  userRating: ratingSchema,
  userCompletedAt: Date,
  completedBy: {
    type: String,
    enum: ['user', 'admin'],
    required: false
  }
});

const Message = mongoose.model('Message', messageSchema);
// Authentication Middlewares
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded.userId);
    
    if (!admin) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    
    req.user = admin;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    
    if (decoded.type !== 'user') {
      return res.status(403).json({ error: 'Invalid token type' });
    }
    
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    
    user.lastActive = new Date();
    await user.save();
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// FIXED FILE UPLOAD ROUTES WITH CORS

// User File Upload
app.post('/api/upload/:messageId', authenticateUser, (req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  console.log('File upload request from origin:', req.headers.origin);
  next();
}, upload.single('file'), async (req, res) => {
  try {
    const { messageId } = req.params;
    const { caption } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    if (message.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }

    let messageType = 'text';
    if (req.file.mimetype.startsWith('image/')) {
      messageType = 'image';
    } else if (req.file.mimetype.startsWith('video/')) {
      messageType = 'video';
    }

    const fileData = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      url: `/uploads/${req.file.filename}`
    };

    const chatMessage = {
      sender: 'user',
      message: caption || '',
      messageType: messageType,
      file: fileData,
      timestamp: new Date()
    };

    const updateData = {
      $push: { chatMessages: chatMessage }
    };
    
    if (message.status === 'pending') {
      updateData.status = 'in-chat';
    }

    await Message.findByIdAndUpdate(
      messageId,
      updateData,
      { new: true, runValidators: true }
    );

    const io = req.app.get('io');
    if (io) {
      io.emit('newChatMessage', {
        messageId: messageId,
        chatMessage: chatMessage
      });
    }

    console.log(`File uploaded by user ${req.user.name}: ${req.file.originalname}`);

    res.json({
      success: true,
      message: 'File uploaded successfully',
      file: fileData,
      chatMessage: chatMessage
    });

  } catch (error) {
    console.error('File upload error:', error);
    
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ error: 'File upload failed' });
  }
});

// Admin File Upload
app.post('/api/admin/upload/:messageId', authenticate, (req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  console.log('Admin file upload request from origin:', req.headers.origin);
  next();
}, upload.single('file'), async (req, res) => {
  try {
    const { messageId } = req.params;
    const { caption } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    let messageType = 'text';
    if (req.file.mimetype.startsWith('image/')) {
      messageType = 'image';
    } else if (req.file.mimetype.startsWith('video/')) {
      messageType = 'video';
    }

    const fileData = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      url: `/uploads/${req.file.filename}`
    };

    const chatMessage = {
      sender: 'admin',
      message: caption || '',
      messageType: messageType,
      file: fileData,
      timestamp: new Date()
    };

    const updateData = {
      $push: { chatMessages: chatMessage }
    };
    
    if (message.status === 'pending') {
      updateData.status = 'in-chat';
    }

    await Message.findByIdAndUpdate(
      messageId,
      updateData,
      { new: true, runValidators: true }
    );

    const io = req.app.get('io');
    if (io) {
      io.emit('newChatMessage', {
        messageId: messageId,
        chatMessage: chatMessage
      });
    }

    console.log(`File uploaded by admin ${req.user.name}: ${req.file.originalname}`);

    res.json({
      success: true,
      message: 'File uploaded successfully',
      file: fileData,
      chatMessage: chatMessage
    });

  } catch (error) {
    console.error('Admin file upload error:', error);
    
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ error: 'File upload failed' });
  }
});

// Basic Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'EhteCounseling API Server',
    status: 'running',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

app.get('/api/debug', (req, res) => {
  res.json({
    origin: req.headers.origin,
    referer: req.headers.referer,
    userAgent: req.headers['user-agent'],
    timestamp: new Date().toISOString()
  });
});

// User Registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, isAnonymous } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = new User({
      email,
      password: hashedPassword,
      name,
      isAnonymous: isAnonymous || false
    });

    await user.save();
    
    const token = jwt.sign(
      { userId: user._id, email: user.email, type: 'user' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log(`User registered: ${email}`);
    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        isAnonymous: user.isAnonymous
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// User Login
app.post('/api/auth/user-login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    user.lastActive = new Date();
    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email, type: 'user' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log(`User logged in: ${email}`);
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        isAnonymous: user.isAnonymous
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Validate user token
app.post('/api/auth/validate-user', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    
    if (decoded.type !== 'user') {
      return res.status(403).json({ error: 'Invalid token type' });
    }
    
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    user.lastActive = new Date();
    await user.save();

    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      isAnonymous: user.isAnonymous
    });
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
});

// Create admin account
app.post('/api/auth/create-admin', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    const admin = new Admin({
      email,
      password: hashedPassword,
      name
    });

    await admin.save();
    
    console.log(`Admin created: ${email}`);
    res.json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ error: 'Failed to create admin' });
  }
});

// Admin login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: admin._id, email: admin.email, type: 'admin' },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    console.log(`Admin logged in: ${email}`);
    res.json({
      token,
      user: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Validate admin token
app.post('/api/auth/validate', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded.userId);
    
    if (!admin) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    res.json({
      id: admin._id,
      email: admin.email,
      name: admin.name,
      role: admin.role
    });
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
});
// Store push token (admin only)
app.post('/api/admin/register-push-token', authenticate, async (req, res) => {
  try {
    const { pushToken, deviceType } = req.body;
    
    // You can store this in your admin schema or create a separate collection
    await Admin.findByIdAndUpdate(req.user._id, {
      pushToken: pushToken,
      deviceType: deviceType,
      lastTokenUpdate: new Date()
    });
    
    res.json({ success: true, message: 'Push token registered' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register push token' });
  }
});
// Message Routes
app.get('/api/messages', authenticate, async (req, res) => {
  try {
    const messages = await Message.find().populate('userId', 'name email isAnonymous').sort({ timestamp: -1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

app.get('/api/user/messages', authenticateUser, async (req, res) => {
  try {
    const messages = await Message.find({ userId: req.user._id }).sort({ timestamp: -1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching user messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

app.get('/api/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findById(id).populate('userId', 'name email isAnonymous');
    
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch message' });
  }
});

app.post('/api/messages', authenticateUser, async (req, res) => {
  try {
    const { message } = req.body;
    
    const newMessage = new Message({
      userId: req.user._id,
      message,
      name: req.user.isAnonymous ? 'Anonymous' : req.user.name,
      isAnonymous: req.user.isAnonymous,
      chatMessages: [{
        sender: 'user',
        message: message,
        messageType: 'text',
        timestamp: new Date()
      }]
    });

    await newMessage.save();
    
    await newMessage.populate('userId', 'name email isAnonymous');
    
    io.emit('newMessage', newMessage);
    
    console.log(`New message from ${req.user.name}: ${message.substring(0, 50)}...`);
    
    res.json({ 
      success: true, 
      message: 'Message sent successfully!', 
      id: newMessage._id 
    });
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Socket.IO Connection Handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('join-admin', () => {
    socket.join('admin');
    console.log(`Admin joined: ${socket.id}`);
  });

  socket.on('join-message-room', (messageId) => {
    socket.join(`message-${messageId}`);
    console.log(`User joined message room: ${messageId}`);
  });

  socket.on('join-user-room', (userId) => {
    socket.join(`user-${userId}`);
    console.log(`User joined user room: ${userId}`);
  });

  socket.on('send-chat-message', async (data) => {
    const { messageId, message, sender, messageType, file } = data;
    
    try {
      const chatMessage = {
        sender: sender,
        message: message || '',
        messageType: messageType || 'text',
        file: file || null,
        timestamp: new Date()
      };

      await Message.findByIdAndUpdate(messageId, {
        $push: { chatMessages: chatMessage }
      });

      io.to(`message-${messageId}`).emit('newChatMessage', {
        messageId: messageId,
        chatMessage: chatMessage
      });

      io.to('admin').emit('newChatMessage', {
        messageId: messageId,
        chatMessage: chatMessage
      });

      const messagePreview = messageType === 'text' ? 
        message.substring(0, 50) + '...' : 
        `${messageType} file: ${file?.originalName || 'unknown'}`;

      console.log(`Chat message sent in ${messageId}: ${messagePreview}`);
    } catch (error) {
      console.error('Error handling chat message:', error);
    }
  });

  socket.on('user-completed-session', (data) => {
    const { messageId, userName } = data;
    
    io.to('admin').emit('userCompletedSession', {
      messageId: messageId,
      userName: userName
    });

    console.log(`User ${userName} completed session ${messageId}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

app.set('io', io);

// Update message status (admin only)
app.patch('/api/messages/:id/status', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'in-chat', 'in-call', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updateData = { status: status };
    if (status === 'completed') {
      updateData.completedBy = 'admin';
    }

    const message = await Message.findByIdAndUpdate(
      id, 
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    io.emit('messageStatusUpdate', { id: id, status: status });
    
    res.json({ success: true, message });
  } catch (error) {
    console.error('Error updating message status:', error);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// Set meeting links (admin only)
app.patch('/api/messages/:id/meeting-links', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { googleMeet, zoom } = req.body;

    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    if (!message.meetingLinks) {
      message.meetingLinks = {};
    }

    message.meetingLinks.googleMeet = googleMeet || '';
    message.meetingLinks.zoom = zoom || '';

    await message.save();
    
    io.emit('meetingLinksUpdate', {
      messageId: id,
      meetingLinks: message.meetingLinks
    });
    
    res.json({ 
      success: true, 
      message: 'Meeting links updated successfully' 
    });
  } catch (error) {
    console.error('Error setting meeting links:', error);
    res.status(500).json({ error: 'Failed to set meeting links' });
  }
});

// User completes session endpoint
app.patch('/api/messages/:id/user-complete', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    
    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    if (message.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }

    message.status = 'completed';
    message.completedBy = 'user';
    message.userCompletedAt = new Date();
    
    await message.save();

    await message.populate('userId', 'name email isAnonymous');

    io.emit('userCompletedSession', {
      messageId: id,
      userName: message.name || 'Anonymous',
      message: message
    });

    console.log(`User ${req.user.name} completed session for message ${id}`);
    
    res.json({ 
      success: true, 
      message: 'Session completed successfully',
      messageStatus: message.status 
    });
  } catch (error) {
    console.error('Error completing user session:', error);
    res.status(500).json({ error: 'Failed to complete session' });
  }
});

// User rating endpoint
app.post('/api/messages/:id/rating', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, feedback } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Valid rating (1-5) is required' });
    }

    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    if (message.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }

    message.userRating = {
      rating: rating,
      feedback: feedback || '',
      submittedAt: new Date()
    };

    await message.save();

    io.emit('newRating', {
      messageId: id,
      rating: rating,
      feedback: feedback
    });

    console.log(`User ${req.user.name} rated session ${id} with ${rating} stars`);
    
    res.json({ 
      success: true, 
      message: 'Rating submitted successfully' 
    });
  } catch (error) {
    console.error('Error submitting rating:', error);
    res.status(500).json({ error: 'Failed to submit rating' });
  }
});

// User sets their own meeting links endpoint
app.patch('/api/messages/:id/user-meeting-links', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { googleMeet, zoom } = req.body;

    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    if (message.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }

    if (!message.meetingLinks) {
      message.meetingLinks = {};
    }

    if (googleMeet) {
      message.meetingLinks.userGoogleMeet = googleMeet;
    }
    if (zoom) {
      message.meetingLinks.userZoom = zoom;
    }

    await message.save();
    
    res.json({ 
      success: true, 
      message: 'Meeting links updated successfully',
      meetingLinks: message.meetingLinks
    });
  } catch (error) {
    console.error('Error setting user meeting links:', error);
    res.status(500).json({ error: 'Failed to set meeting links' });
  }
});

// Create payment order
app.post('/api/create-payment-order', async (req, res) => {
  try {
    const { amount, messageId } = req.body;

    console.log('Creating payment order:', { amount, messageId });

    if (!amount || amount < 1) {
      return res.status(400).json({ success: false, error: 'Valid amount is required' });
    }

    const amountInPaise = Math.round(amount * 100);
    
    const shortId = messageId ? messageId.substring(messageId.length - 8) : 'guest';
    const timestamp = Date.now().toString().slice(-8);
    const receipt = `rcpt_${shortId}_${timestamp}`;
    
    console.log(`Creating payment order: Amount=${amount}, Receipt=${receipt} (${receipt.length} chars)`);
    
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: receipt,
      payment_capture: 1
    });

    console.log(`Payment order created successfully: ${order.id}`);

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Payment order creation error:', error);
    res.status(500).json({ success: false, error: 'Failed to create payment order' });
  }
});

// Bulk delete messages (admin only)
app.delete('/api/messages/bulk-delete', authenticate, async (req, res) => {
  try {
    const { messageIds } = req.body;
    
    if (!messageIds || !Array.isArray(messageIds)) {
      return res.status(400).json({ error: 'Message IDs array is required' });
    }

    const messages = await Message.find({ _id: { $in: messageIds } });
    for (const message of messages) {
      if (message.chatMessages) {
        for (const chatMsg of message.chatMessages) {
          if (chatMsg.file && chatMsg.file.filename) {
            const filePath = path.join(uploadsDir, chatMsg.file.filename);
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
              console.log(`Deleted file: ${filePath}`);
            }
          }
        }
      }
    }

    const result = await Message.deleteMany({ _id: { $in: messageIds } });
    
    console.log(`Admin bulk deleted ${result.deletedCount} messages`);
    
    res.json({ 
      success: true, 
      message: `${result.deletedCount} conversations deleted successfully`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error bulk deleting messages:', error);
    res.status(500).json({ error: 'Failed to delete conversations' });
  }
});

// Delete message/conversation (admin only)
app.delete('/api/messages/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log(`Attempting to delete message: ${id}`);
    
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid message ID format' });
    }
    
    const message = await Message.findById(id);
    
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    if (message.chatMessages) {
      for (const chatMsg of message.chatMessages) {
        if (chatMsg.file && chatMsg.file.filename) {
          const filePath = path.join(uploadsDir, chatMsg.file.filename);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Deleted file: ${filePath}`);
          }
        }
      }
    }

    await Message.findByIdAndDelete(id);

    console.log(`Admin deleted message ${id}`);
    
    res.json({ 
      success: true, 
      message: 'Conversation deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Failed to delete conversation' });
  }
});

// Mobile Payment Redirect Endpoint
// Replace your existing /api/payment/razorpay route with this:
app.get('/api/payment/razorpay', async (req, res) => {
  try {
    const { orderId, amount, messageId } = req.query;
    
    if (!orderId) {
      return res.status(400).send('Order ID is required');
    }

    // Set proper security headers
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Payment</title>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <style>
            body { 
                font-family: Arial, sans-serif; 
                text-align: center; 
                padding: 50px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                min-height: 100vh;
                margin: 0;
            }
            .container {
                background: white;
                color: black;
                padding: 30px;
                border-radius: 10px;
                max-width: 400px;
                margin: 0 auto;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .btn {
                background: #3b82f6;
                color: white;
                border: none;
                padding: 15px 30px;
                font-size: 16px;
                border-radius: 5px;
                cursor: pointer;
                margin: 10px;
                transition: background-color 0.2s;
            }
            .btn:hover {
                background: #2563eb;
            }
            .btn:disabled {
                background: #9ca3af;
                cursor: not-allowed;
            }
            .amount {
                font-size: 24px;
                font-weight: bold;
                color: #10b981;
                margin: 20px 0;
            }
            .loading {
                display: inline-block;
                width: 20px;
                height: 20px;
                border: 3px solid #f3f3f3;
                border-top: 3px solid #3b82f6;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            .status {
                margin-top: 20px;
                font-size: 14px;
                color: #666;
                min-height: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Payment Gateway</h2>
            <div class="amount">Amount: ₹${amount || 'N/A'}</div>
            <p>Click the button below to complete your payment</p>
            <button id="payButton" class="btn">Pay Now</button>
            <br>
            <button onclick="window.close()" class="btn" style="background: #6b7280;">Cancel</button>
            <div id="status" class="status"></div>
        </div>

        <script>
            function setStatus(message, isError = false) {
                const statusEl = document.getElementById('status');
                statusEl.innerHTML = message;
                statusEl.style.color = isError ? '#dc2626' : '#059669';
            }

            function disableButtons(disabled = true) {
                document.getElementById('payButton').disabled = disabled;
            }

            document.getElementById('payButton').onclick = function() {
                if (this.disabled) return;
                
                setStatus('<div class="loading"></div> Opening payment gateway...');
                disableButtons(true);
                
                const options = {
                    key: '${process.env.RAZORPAY_KEY_ID}',
                    amount: ${amount ? amount * 100 : 0},
                    currency: 'INR',
                    name: 'EhteCounseling',
                    description: 'Counseling Session Payment',
                    order_id: '${orderId}',
                    handler: function (response) {
                        setStatus('<div class="loading"></div> Verifying payment...');
                        
                        fetch('/api/verify-payment', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                messageId: '${messageId}',
                                amount: ${amount ? amount * 100 : 0}
                            })
                        })
                        .then(res => res.json())
                        .then(data => {
                            if (data.success) {
                                setStatus('✅ Payment successful! You can close this window.');
                                setTimeout(() => {
                                    try {
                                        window.close();
                                    } catch (e) {
                                        setStatus('✅ Payment successful! Please close this window.');
                                    }
                                }, 3000);
                            } else {
                                setStatus('❌ Payment verification failed. Please contact support.', true);
                                disableButtons(false);
                            }
                        })
                        .catch(error => {
                            console.error('Verification error:', error);
                            setStatus('❌ Payment verification failed. Please contact support.', true);
                            disableButtons(false);
                        });
                    },
                    prefill: {
                        name: 'User'
                    },
                    theme: {
                        color: '#3b82f6'
                    },
                    modal: {
                        ondismiss: function() {
                            setStatus('Payment cancelled');
                            disableButtons(false);
                        }
                    }
                };
                
                if (window.Razorpay) {
                    try {
                        const rzp = new window.Razorpay(options);
                        rzp.open();
                    } catch (error) {
                        console.error('Razorpay error:', error);
                        setStatus('❌ Payment gateway error. Please try again.', true);
                        disableButtons(false);
                    }
                } else {
                    setStatus('❌ Payment gateway not available. Please try again.', true);
                    disableButtons(false);
                }
            };

            // Auto-trigger payment on page load for better UX
            setTimeout(() => {
                if (!document.getElementById('payButton').disabled) {
                    document.getElementById('payButton').click();
                }
            }, 1000);

            // Handle page visibility change
            document.addEventListener('visibilitychange', function() {
                if (document.visibilityState === 'visible') {
                    // Page became visible again, re-enable buttons if needed
                    const status = document.getElementById('status').textContent;
                    if (status.includes('cancelled') || status.includes('failed')) {
                        disableButtons(false);
                    }
                }
            });
        </script>
    </body>
    </html>
    `;

    res.send(html);
  } catch (error) {
    console.error('Payment page error:', error);
    res.status(500).send('Payment page error');
  }
});

// Verify payment
app.post('/api/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, messageId, amount } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                                    .update(body.toString())
                                    .digest('hex');

    if (expectedSignature === razorpay_signature) {
      if (messageId) {
        await Message.findByIdAndUpdate(messageId, {
          paymentStatus: 'paid',
          paymentId: razorpay_payment_id,
          amountPaid: amount / 100,
          paidAt: new Date()
        });
      }

      io.emit('paymentReceived', {
        messageId: messageId,
        amount: amount / 100,
        paymentId: razorpay_payment_id
      });

      console.log(`Payment verified for message ${messageId}: ₹${amount / 100}`);

      res.json({ success: true, message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ success: false, error: 'Payment verification failed' });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ success: false, error: 'Payment verification failed' });
  }
});

// CLEANUP ENDPOINT FOR FIXING NULL COMPLETED_BY VALUES
app.post('/api/admin/fix-completed-by', authenticate, async (req, res) => {
  try {
    const result = await Message.updateMany(
      { completedBy: null },
      { $unset: { completedBy: 1 } }
    );
    
    console.log(`Fixed ${result.modifiedCount} documents with null completedBy`);
    res.json({
      success: true,
      message: `Fixed ${result.modifiedCount} documents`
    });
  } catch (error) {
    console.error('Error fixing completedBy:', error);
    res.status(500).json({ error: 'Failed to fix documents' });
  }
});

// Error handling middleware for multer
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 4GB.' });
    }
    return res.status(400).json({ error: `Upload error: ${error.message}` });
  }
  
  if (error.message.includes('Invalid file type')) {
    return res.status(400).json({ error: error.message });
  }
  
  next(error);
});

// Generic error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Local: http://localhost:${PORT}`);
  console.log(`Network: http://192.168.31.177:${PORT}`);
  console.log(`Uploads directory: ${uploadsDir}`);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Admin Dashboard: http://localhost:${PORT}/?admin`);
    console.log(`User Interface: http://localhost:${PORT}/`);
  }
});