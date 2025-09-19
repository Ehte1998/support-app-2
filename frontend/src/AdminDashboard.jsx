import { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'

// Get API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// File Upload Component for Admin
function AdminFileUploadComponent({ messageId, onUploadSuccess, onUploadError }) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [dragOver, setDragOver] = useState(false)
  const [caption, setCaption] = useState('')

  const handleFileSelect = (file) => {
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 
                         'video/mp4', 'video/mov', 'video/avi', 'video/mkv', 'video/webm', 'video/3gp']
    
    if (!allowedTypes.includes(file.type)) {
      onUploadError('Only image and video files are allowed')
      return
    }

    // Validate file size (4GB)
    const maxSize = 4 * 1024 * 1024 * 1024 // 4GB
    if (file.size > maxSize) {
      onUploadError('File size exceeds 4GB limit')
      return
    }

    uploadFile(file)
  }

  const uploadFile = async (file) => {
    setUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', file)
      if (caption.trim()) {
        formData.append('caption', caption.trim())
      }

      const token = localStorage.getItem('adminToken')

      const xhr = new XMLHttpRequest()

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100)
          setUploadProgress(progress)
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText)
          onUploadSuccess(response.file)
          setCaption('')
        } else {
          const error = JSON.parse(xhr.responseText)
          onUploadError(error.error || 'Upload failed')
        }
        setUploading(false)
        setUploadProgress(0)
      })

      xhr.addEventListener('error', () => {
        onUploadError('Upload failed due to network error')
        setUploading(false)
        setUploadProgress(0)
      })

      xhr.open('POST', `${API_URL}/api/admin/upload/${messageId}`)
      xhr.setRequestHeader('Authorization', `Bearer ${token}`)
      xhr.send(formData)

    } catch (error) {
      console.error('Upload error:', error)
      onUploadError('Upload failed')
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }

  if (uploading) {
    return (
      <div className="fade-in" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1rem',
        margin: '0.5rem 0'
      }}>
        <div className="loading-spinner" style={{
          width: '20px',
          height: '20px',
          border: '2px solid #e5e7eb',
          borderTop: '2px solid #3b82f6',
          borderRadius: '50%'
        }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.875rem', color: '#374151', marginBottom: '0.25rem' }}>
            Uploading... {uploadProgress}%
          </div>
          <div className="upload-progress">
            <div 
              className={`upload-progress-bar ${uploadProgress > 0 ? 'progress-bar-active' : ''}`}
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ margin: '0.5rem 0' }}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`file-drop-area ${dragOver ? 'drag-over upload-area-active' : ''} button-hover`}
      >
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => handleFileSelect(e.target.files[0])}
          style={{ display: 'none' }}
          id={`admin-file-input-${messageId}`}
        />
        
        <label
          htmlFor={`admin-file-input-${messageId}`}
          style={{ cursor: 'pointer', width: '100%', display: 'block' }}
        >
          <div style={{
            fontSize: '1.5rem',
            marginBottom: '0.25rem',
            color: dragOver ? '#3b82f6' : '#6b7280'
          }}>
            📎
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: dragOver ? '#3b82f6' : '#374151',
            fontWeight: '500',
            marginBottom: '0.25rem'
          }}>
            {dragOver ? 'Drop file here' : 'Upload photo/video'}
          </div>
          <div style={{
            fontSize: '0.625rem',
            color: '#6b7280',
            lineHeight: '1.2'
          }}>
            Max 4GB • JPG, PNG, GIF, MP4, MOV, etc.
          </div>
        </label>
      </div>
      
      <input
        type="text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Add a caption (optional)"
        style={{
          width: '100%',
          padding: '0.5rem',
          border: '1px solid #d1d5db',
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
          marginTop: '0.5rem'
        }}
      />
    </div>
  )
}

// Media Message Component for Admin Dashboard
function AdminMediaMessage({ message, isOwnMessage }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [showFullscreen, setShowFullscreen] = useState(false)

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleDownload = () => {
    if (message.file?.url) {
      const link = document.createElement('a')
      link.href = `${API_URL}${message.file.url}`
      link.download = message.file.originalName || 'file'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const renderMedia = () => {
    if (!message.file) return null

    const fileUrl = `${API_URL}${message.file.url}`

    if (message.messageType === 'image') {
      return (
        <div style={{ position: 'relative' }}>
          {!imageLoaded && !imageError && (
            <div style={{
              width: '200px',
              height: '150px',
              background: '#f3f4f6',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6b7280',
              fontSize: '0.875rem'
            }}>
              Loading image...
            </div>
          )}
          
          {imageError ? (
            <div style={{
              width: '200px',
              height: '150px',
              background: '#fef2f2',
              borderRadius: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#dc2626',
              fontSize: '0.875rem',
              textAlign: 'center'
            }}>
              <div>Image failed to load</div>
              <button onClick={handleDownload} style={{
                marginTop: '0.5rem',
                padding: '0.25rem 0.5rem',
                background: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}>
                Download
              </button>
            </div>
          ) : (
            <img
              src={fileUrl}
              alt={message.file.originalName}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              onClick={() => setShowFullscreen(true)}
              style={{
                maxWidth: '300px',
                maxHeight: '200px',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                objectFit: 'cover',
                display: imageLoaded ? 'block' : 'none'
              }}
            />
          )}

          {showFullscreen && imageLoaded && !imageError && (
            <div
              className="fullscreen-modal"
              onClick={() => setShowFullscreen(false)}
            >
              <img
                src={fileUrl}
                alt={message.file.originalName}
                className="fullscreen-image"
              />
              <button
                onClick={() => setShowFullscreen(false)}
                className="fullscreen-close"
              >
                ×
              </button>
            </div>
          )}
        </div>
      )
    }

    if (message.messageType === 'video') {
      return (
        <div className="video-container">
          <video
            controls
            className="video-player"
            style={{
              maxWidth: '300px',
              maxHeight: '200px'
            }}
          >
            <source src={fileUrl} type={message.file.mimetype} />
            Your browser does not support the video tag.
          </video>
        </div>
      )
    }

    return null
  }

  return (
    <div>
      {renderMedia()}
      
      {message.message && (
        <div style={{
          marginTop: '0.5rem',
          fontSize: '0.875rem',
          lineHeight: '1.4'
        }}>
          {message.message}
        </div>
      )}
      
      <div style={{
        marginTop: '0.5rem',
        fontSize: '0.75rem',
        opacity: 0.8,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap'
      }}>
        <span>{message.file?.originalName}</span>
        <span>•</span>
        <span>{formatFileSize(message.file?.size)}</span>
        <button
          onClick={handleDownload}
          style={{
            background: 'none',
            border: 'none',
            color: isOwnMessage ? 'rgba(255,255,255,0.8)' : '#6b7280',
            cursor: 'pointer',
            fontSize: '0.75rem',
            textDecoration: 'underline'
          }}
        >
          Download
        </button>
      </div>
    </div>
  )
}

function AdminDashboard({ user, onLogout }) {
  const [messages, setMessages] = useState([])
  const [status, setStatus] = useState('offline')
  const [loading, setLoading] = useState(true)
  const [socket, setSocket] = useState(null)
  const [notification, setNotification] = useState(null)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [meetingLinks, setMeetingLinks] = useState({ googleMeet: '', zoom: '' })
  const [showMeetingForm, setShowMeetingForm] = useState(false)
  const [activeChat, setActiveChat] = useState(null)
  const [chatMessages, setChatMessages] = useState([])
  const [newChatMessage, setNewChatMessage] = useState('')
  
  // Delete functionality state
  const [selectedMessages, setSelectedMessages] = useState([])
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [bulkDeleteMode, setBulkDeleteMode] = useState(false)
  const [isDeletingBulk, setIsDeletingBulk] = useState(false)

  // File upload state for admin
  const [showFileUpload, setShowFileUpload] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [uploadSuccess, setUploadSuccess] = useState('')

  // File upload handlers for admin
  const handleUploadSuccess = (fileData) => {
    setUploadSuccess(`File uploaded successfully: ${fileData.originalName}`)
    setShowFileUpload(false)
    setTimeout(() => setUploadSuccess(''), 3000)
    fetchChatMessages()
  }

  const handleUploadError = (error) => {
    setUploadError(error)
    setTimeout(() => setUploadError(''), 5000)
  }

  // Socket connection setup
  useEffect(() => {
    const newSocket = io(API_URL)
    setSocket(newSocket)

    newSocket.on('connect', () => {
      newSocket.emit('join-admin')
    })

    newSocket.on('newMessage', (newMessage) => {
      setMessages(prev => [newMessage, ...prev])
      setNotification({
        type: 'new_message',
        message: `New message from ${newMessage.name}`,
        timestamp: Date.now()
      })
    })

    newSocket.on('newChatMessage', (data) => {
      if (activeChat === data.messageId) {
        setChatMessages(prev => [...prev, data.chatMessage])
      }
      setMessages(prev => prev.map(msg => 
        msg._id === data.messageId 
          ? { ...msg, status: 'in-chat' }
          : msg
      ))
    })

    newSocket.on('paymentReceived', (data) => {
      setNotification({
        type: 'payment',
        message: `Payment received: ₹${data.amount}`,
        timestamp: Date.now()
      })
      fetchMessages()
    })

    newSocket.on('userCompletedSession', (data) => {
      setMessages(prev => prev.map(msg => 
        msg._id === data.messageId 
          ? { ...msg, status: 'completed', completedBy: 'user' }
          : msg
      ))
      setNotification({
        type: 'user_completion',
        message: `${data.userName} completed their session`,
        timestamp: Date.now()
      })
    })

    newSocket.on('newRating', (data) => {
      setMessages(prev => prev.map(msg => 
        msg._id === data.messageId 
          ? { ...msg, userRating: { rating: data.rating, feedback: data.feedback } }
          : msg
      ))
      setNotification({
        type: 'rating',
        message: `New rating: ${data.rating} stars`,
        timestamp: Date.now()
      })
    })

    return () => newSocket.close()
  }, [activeChat])

  // Auto-hide notifications
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      if (!token) {
        onLogout()
        return
      }

      const response = await fetch(`${API_URL}/api/messages`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      } else if (response.status === 401 || response.status === 403) {
        onLogout()
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteMessage = async (messageId) => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_URL}/api/messages/${messageId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        setMessages(prev => prev.filter(msg => msg._id !== messageId))
        setNotification({
          type: 'delete',
          message: 'Conversation deleted successfully',
          timestamp: Date.now()
        })
      } else {
        alert('Failed to delete conversation')
      }
    } catch (error) {
      console.error('Error deleting message:', error)
      alert('Error deleting conversation')
    }
  }

  const bulkDeleteMessages = async () => {
    setIsDeletingBulk(true)
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_URL}/api/messages/bulk-delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ messageIds: selectedMessages })
      })

      if (response.ok) {
        const result = await response.json()
        setMessages(prev => prev.filter(msg => !selectedMessages.includes(msg._id)))
        setSelectedMessages([])
        setBulkDeleteMode(false)
        setNotification({
          type: 'delete',
          message: `${result.deletedCount} conversations deleted`,
          timestamp: Date.now()
        })
      } else {
        alert('Failed to delete conversations')
      }
    } catch (error) {
      console.error('Error bulk deleting:', error)
      alert('Error deleting conversations')
    } finally {
      setIsDeletingBulk(false)
    }
  }

  const toggleMessageSelection = (messageId) => {
    setSelectedMessages(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    )
  }

  const startChatSession = async (messageId) => {
    setActiveChat(messageId)
    const response = await fetch(`${API_URL}/api/messages/${messageId}`)
    if (response.ok) {
      const messageData = await response.json()
      setChatMessages(messageData.chatMessages || [])
    }
    updateMessageStatus(messageId, 'in-chat')
  }

  const updateMessageStatus = async (messageId, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_URL}/api/messages/${messageId}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        setMessages(prev => prev.map(msg => 
          msg._id === messageId ? { ...msg, status: newStatus } : msg
        ))
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const sendChatMessage = () => {
    if (!newChatMessage.trim() || !socket || !activeChat) return

    const messageData = {
      messageId: activeChat,
      message: newChatMessage.trim(),
      sender: 'admin',
      messageType: 'text'
    }

    setChatMessages(prev => [...prev, {
      sender: 'admin',
      message: newChatMessage.trim(),
      messageType: 'text',
      timestamp: new Date()
    }])
    
    socket.emit('send-chat-message', messageData)
    setNewChatMessage('')
  }

  const fetchChatMessages = async () => {
    if (!activeChat) return
    
    try {
      const response = await fetch(`${API_URL}/api/messages/${activeChat}`)
      if (response.ok) {
        const messageData = await response.json()
        setChatMessages(messageData.chatMessages || [])
      }
    } catch (error) {
      console.error('Error fetching chat messages:', error)
    }
  }

  const setMeetingLinksForMessage = async (messageId) => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_URL}/api/messages/${messageId}/meeting-links`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(meetingLinks)
      })

      if (response.ok) {
        setShowMeetingForm(false)
        setSelectedMessage(null)
        setMeetingLinks({ googleMeet: '', zoom: '' })
        fetchMessages()
      }
    } catch (error) {
      console.error('Error setting meeting links:', error)
    }
  }

  const getTimeAgo = (timestamp) => {
    const now = new Date()
    const messageTime = new Date(timestamp)
    const diffInMinutes = Math.floor((now - messageTime) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ color: 'white', fontSize: '1.2rem' }}>Loading...</div>
      </div>
    )
  }

  // Chat Interface - Early return for active chat
  if (activeChat) {
    const activeChatMessage = messages.find(msg => msg._id === activeChat)
    
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem'
      }}>
        <div style={{ 
          background: 'white', 
          borderRadius: '1rem', 
          overflow: 'hidden',
          height: 'calc(100vh - 4rem)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            padding: '1rem 2rem',
            borderBottom: '1px solid #e5e7eb',
            background: '#f9fafb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <button
                onClick={() => {
                  setActiveChat(null)
                  setChatMessages([])
                  setShowFileUpload(false)
                  setUploadError('')
                  setUploadSuccess('')
                }}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  marginRight: '1rem'
                }}
              >
                ← Back
              </button>
              <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1f2937' }}>
                Chat with {activeChatMessage?.name || 'User'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setShowFileUpload(!showFileUpload)}
                style={{
                  padding: '0.5rem 1rem',
                  background: showFileUpload ? '#dc2626' : '#8b5cf6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                {showFileUpload ? 'Cancel Upload' : '📎 Upload Media'}
              </button>
              <button
                onClick={() => updateMessageStatus(activeChat, 'completed')}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#059669',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                Complete Session
              </button>
            </div>
          </div>

          {activeChatMessage && (
            <div style={{
              padding: '1rem 2rem',
              background: '#f9fafb',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                Original message:
              </div>
              <div style={{
                padding: '0.75rem',
                background: 'white',
                borderRadius: '0.375rem',
                color: '#374151',
                borderLeft: '4px solid #3b82f6'
              }}>
                {activeChatMessage.message}
              </div>
            </div>
          )}

          {uploadSuccess && (
            <div className="success-message notification-enter" style={{
              margin: '1rem 2rem 0 2rem'
            }}>
              ✅ {uploadSuccess}
            </div>
          )}
          
          {uploadError && (
            <div className="error-message notification-enter" style={{
              margin: '1rem 2rem 0 2rem'
            }}>
              ❌ {uploadError}
            </div>
          )}

          {showFileUpload && (
            <div style={{
              padding: '1rem 2rem',
              background: '#f9fafb',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <AdminFileUploadComponent
                messageId={activeChat}
                onUploadSuccess={handleUploadSuccess}
                onUploadError={handleUploadError}
              />
            </div>
          )}

          <div style={{
            flex: 1,
            padding: '1rem 2rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
          className="chat-messages"
          >
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'admin' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  maxWidth: '70%',
                  padding: '0.75rem 1rem',
                  borderRadius: '1rem',
                  background: msg.sender === 'admin' ? '#3b82f6' : '#f3f4f6',
                  color: msg.sender === 'admin' ? 'white' : '#374151'
                }}>
                  {msg.messageType === 'image' || msg.messageType === 'video' ? (
                    <AdminMediaMessage message={msg} isOwnMessage={msg.sender === 'admin'} />
                  ) : (
                    <>
                      <div style={{ fontSize: '0.875rem' }}>
                        {msg.message}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        marginTop: '0.5rem',
                        opacity: 0.7
                      }}>
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            padding: '1rem 2rem',
            borderTop: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <textarea
                value={newChatMessage}
                onChange={(e) => setNewChatMessage(e.target.value)}
                placeholder="Type your response..."
                rows={2}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  resize: 'none'
                }}
              />
              <button
                onClick={sendChatMessage}
                disabled={!newChatMessage.trim()}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: !newChatMessage.trim() ? '#d1d5db' : '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: !newChatMessage.trim() ? 'not-allowed' : 'pointer'
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Calculate stats for main dashboard
  const pendingCount = messages.filter(msg => msg.status === 'pending').length
  const inChatCount = messages.filter(msg => msg.status === 'in-chat').length
  const inCallCount = messages.filter(msg => msg.status === 'in-call').length
  const completedCount = messages.filter(msg => msg.status === 'completed').length
  const paidCount = messages.filter(msg => msg.paymentStatus === 'paid').length
  const totalEarnings = messages
    .filter(msg => msg.paymentStatus === 'paid')
    .reduce((sum, msg) => sum + (msg.amountPaid || 0), 0)

    // Stats calculation continues from Part 3
  const ratedMessages = messages.filter(msg => msg.userRating)
  const avgRating = ratedMessages.length > 0 
    ? ratedMessages.reduce((sum, msg) => sum + msg.userRating.rating, 0) / ratedMessages.length
    : 0

  // Main dashboard return
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      {notification && (
        <div style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          background: notification.type === 'new_message' ? '#10b981' : 
                     notification.type === 'payment' ? '#8b5cf6' : 
                     notification.type === 'rating' ? '#c026d3' : 
                     notification.type === 'delete' ? '#ef4444' : '#3b82f6',
          color: 'white',
          padding: '1rem 1.5rem',
          borderRadius: '0.5rem',
          zIndex: 999,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1.2rem'
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {showMeetingForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '1rem',
            maxWidth: '500px',
            width: '90%'
          }}>
            <h3 style={{ margin: '0 0 1rem 0' }}>Set Meeting Links</h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                Google Meet Link:
              </label>
              <input
                type="url"
                value={meetingLinks.googleMeet}
                onChange={(e) => setMeetingLinks(prev => ({ ...prev, googleMeet: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                Zoom Link:
              </label>
              <input
                type="url"
                value={meetingLinks.zoom}
                onChange={(e) => setMeetingLinks(prev => ({ ...prev, zoom: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowMeetingForm(false)
                  setSelectedMessage(null)
                  setMeetingLinks({ googleMeet: '', zoom: '' })
                }}
                style={{
                  padding: '0.75rem 1rem',
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => setMeetingLinksForMessage(selectedMessage)}
                style={{
                  padding: '0.75rem 1rem',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer'
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '2.5rem',
            borderRadius: '1rem',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>
                ⚠️
              </div>
              <h3 style={{ 
                margin: '0 0 1rem 0', 
                color: '#dc2626',
                fontSize: '1.5rem',
                fontWeight: '700'
              }}>
                Confirm Bulk Deletion
              </h3>
            </div>
            
            <div style={{
              background: '#fef2f2',
              padding: '1rem',
              borderRadius: '0.5rem',
              marginBottom: '1.5rem',
              border: '1px solid #fecaca'
            }}>
              <p style={{ 
                margin: '0 0 0.75rem 0', 
                color: '#374151',
                lineHeight: '1.6',
                fontSize: '0.875rem'
              }}>
                You are about to permanently delete <strong style={{color: '#dc2626'}}>{selectedMessages.length}</strong> conversation(s).
              </p>
              <p style={{ 
                margin: '0', 
                color: '#7f1d1d',
                fontSize: '0.75rem',
                lineHeight: '1.4'
              }}>
                This will remove all chat messages, payment information, user ratings, and uploaded files. 
                <strong> This action cannot be undone.</strong>
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeletingBulk}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: isDeletingBulk ? 'not-allowed' : 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
              >
                Cancel
              </button>
              <button
                onClick={bulkDeleteMessages}
                disabled={isDeletingBulk}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: isDeletingBulk ? '#fca5a5' : '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: isDeletingBulk ? 'not-allowed' : 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}
              >
                {isDeletingBulk ? 'Deleting...' : `Yes, Delete ${selectedMessages.length} Conversations`}
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ 
        background: 'white', 
        borderRadius: '1rem', 
        padding: '2rem', 
        marginBottom: '2rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>
              Support Dashboard
            </h1>
            {user && (
              <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
                Welcome, {user.name || user.email}
              </p>
            )}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
              onClick={() => setStatus(status === 'online' ? 'offline' : 'online')}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                backgroundColor: status === 'online' ? '#10b981' : '#6b7280',
                color: 'white',
                fontSize: '1rem'
              }}
            >
              {status === 'online' ? '🟢 Online' : '🔴 Offline'}
            </button>
            <button
              onClick={onLogout}
              style={{
                padding: '0.75rem 1rem',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          <div style={{ background: '#fef3c7', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#d97706', marginBottom: '0.5rem' }}>
              {pendingCount}
            </div>
            <div style={{ color: '#92400e', fontSize: '0.875rem', fontWeight: '500' }}>Pending</div>
          </div>
          <div style={{ background: '#fef7ff', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#c026d3', marginBottom: '0.5rem' }}>
              {inChatCount}
            </div>
            <div style={{ color: '#a21caf', fontSize: '0.875rem', fontWeight: '500' }}>In Chat</div>
          </div>
          <div style={{ background: '#dbeafe', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '0.5rem' }}>
              {inCallCount}
            </div>
            <div style={{ color: '#1e40af', fontSize: '0.875rem', fontWeight: '500' }}>In Call</div>
          </div>
          <div style={{ background: '#dcfce7', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#16a34a', marginBottom: '0.5rem' }}>
              {completedCount}
            </div>
            <div style={{ color: '#15803d', fontSize: '0.875rem', fontWeight: '500' }}>Completed</div>
          </div>
          <div style={{ background: '#f0fdf4', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#059669', marginBottom: '0.5rem' }}>
              ₹{totalEarnings}
            </div>
            <div style={{ color: '#047857', fontSize: '0.875rem', fontWeight: '500' }}>
              Earnings ({paidCount})
            </div>
          </div>
          <div style={{ background: '#fef7ff', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#c026d3', marginBottom: '0.5rem' }}>
              {avgRating > 0 ? avgRating.toFixed(1) : 'N/A'}
            </div>
            <div style={{ color: '#a21caf', fontSize: '0.875rem', fontWeight: '500' }}>
              Avg Rating ({ratedMessages.length})
            </div>
          </div>
        </div>
      </div>

      <div style={{ 
        background: 'white', 
        borderRadius: '1rem', 
        padding: '2rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0, color: '#1f2937' }}>
            Messages ({messages.length})
          </h2>
          <button
            onClick={fetchMessages}
            style={{
              padding: '0.5rem 1rem',
              background: '#f3f4f6',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              color: '#374151'
            }}
          >
            Refresh
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0, color: '#1f2937' }}>
            Messages ({messages.length})
          </h2>
          <button
            onClick={fetchMessages}
            style={{
              padding: '0.5rem 1rem',
              background: '#f3f4f6',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              color: '#374151'
            }}
          >
            Refresh
          </button>
        </div>

        {messages.length > 0 && (
          <div style={{ 
            padding: '1.5rem',
            background: bulkDeleteMode ? '#fef2f2' : '#f9fafb',
            borderRadius: '0.75rem',
            marginBottom: '1rem',
            border: bulkDeleteMode ? '2px solid #fecaca' : '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <button
                  onClick={() => {
                    setBulkDeleteMode(!bulkDeleteMode)
                    setSelectedMessages([])
                    setShowDeleteConfirm(false)
                  }}
                  style={{
                    padding: '0.75rem 1.25rem',
                    background: bulkDeleteMode ? '#dc2626' : '#374151',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}
                >
                  {bulkDeleteMode ? '❌ Cancel Bulk Delete' : '🗑️ Bulk Delete Mode'}
                </button>
                
                {bulkDeleteMode && (
                  <>
                    <button
                      onClick={() => setSelectedMessages(messages.map(msg => msg._id))}
                      style={{
                        padding: '0.5rem 1rem',
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        fontSize: '0.75rem'
                      }}
                    >
                      Select All ({messages.length})
                    </button>
                    
                    <button
                      onClick={() => setSelectedMessages([])}
                      style={{
                        padding: '0.5rem 1rem',
                        background: '#6b7280',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        fontSize: '0.75rem'
                      }}
                    >
                      Deselect All
                    </button>
                  </>
                )}
                
                {bulkDeleteMode && selectedMessages.length > 0 && (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}
                  >
                    🗑️ Delete Selected ({selectedMessages.length})
                  </button>
                )}
              </div>
              
              {bulkDeleteMode && (
                <div style={{ 
                  fontSize: '0.875rem', 
                  color: '#991b1b',
                  fontWeight: '500'
                }}>
                  Select conversations to delete permanently
                </div>
              )}
            </div>
          </div>
        )}
        
        {messages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
            <div style={{ fontSize: '1.1rem' }}>No messages yet</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {messages.map((message) => (
              <div
                key={message._id}
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  background: selectedMessages.includes(message._id) 
                    ? '#fef2f2' 
                    : message.status === 'pending' ? '#fffbeb' : 
                      message.status === 'in-chat' ? '#fef7ff' :
                      message.status === 'in-call' ? '#dbeafe' : 'white',
                  position: 'relative'
                }}
              >
                {bulkDeleteMode && (
                  <div style={{ 
                    position: 'absolute', 
                    top: '1rem', 
                    right: '1rem',
                    background: 'white',
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    border: selectedMessages.includes(message._id) ? '2px solid #3b82f6' : '1px solid #d1d5db'
                  }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="checkbox"
                        checked={selectedMessages.includes(message._id)}
                        onChange={() => toggleMessageSelection(message._id)}
                        style={{ transform: 'scale(1.2)' }}
                      />
                      <span style={{ fontSize: '0.75rem', fontWeight: '500' }}>Select</span>
                    </label>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem', fontSize: '1.1rem' }}>
                      {message.name} • {getTimeAgo(message.timestamp)}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      {new Date(message.timestamp).toLocaleString()}
                    </div>
                    {message.paymentStatus === 'paid' && (
                      <div style={{ fontSize: '0.875rem', color: '#059669', fontWeight: '500', marginTop: '0.25rem' }}>
                        💰 Paid: ₹{message.amountPaid}
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      background: message.status === 'pending' ? '#fef3c7' : 
                                 message.status === 'in-chat' ? '#fef7ff' :
                                 message.status === 'in-call' ? '#dbeafe' : '#dcfce7',
                      color: message.status === 'pending' ? '#92400e' : 
                             message.status === 'in-chat' ? '#a21caf' :
                             message.status === 'in-call' ? '#1e40af' : '#15803d'
                    }}>
                      {message.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div style={{ 
                  color: '#374151', 
                  lineHeight: '1.6', 
                  marginBottom: '1.5rem',
                  background: '#f9fafb',
                  padding: '1rem',
                  borderRadius: '0.375rem',
                  borderLeft: '4px solid #3b82f6'
                }}>
                  {message.message}
                </div>

                {message.status === 'completed' && message.userRating && (
                  <div style={{ 
                    marginBottom: '1rem',
                    padding: '0.75rem',
                    background: '#f0fdf4',
                    borderRadius: '0.375rem',
                    border: '1px solid #bbf7d0'
                  }}>
                    <div style={{ color: '#166534', fontWeight: '600', marginBottom: '0.5rem' }}>
                      ✅ Session completed {message.completedBy === 'user' ? 'by user' : 'by admin'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span>Rating:</span>
                      {[1, 2, 3, 4, 5].map(star => (
                        <span key={star} style={{ 
                          color: star <= message.userRating.rating ? '#fbbf24' : '#d1d5db',
                          fontSize: '1rem'
                        }}>
                          ★
                        </span>
                      ))}
                      <span style={{ marginLeft: '0.25rem' }}>
                        ({message.userRating.rating}/5)
                      </span>
                    </div>
                    {message.userRating.feedback && (
                      <div style={{ 
                        marginTop: '0.5rem',
                        fontStyle: 'italic',
                        color: '#374151'
                      }}>
                        "{message.userRating.feedback}"
                      </div>
                    )}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {!bulkDeleteMode && (
                    <>
                      {message.status === 'pending' && (
                        <button
                          onClick={() => startChatSession(message._id)}
                          style={{
                            padding: '0.5rem 1rem',
                            background: '#8b5cf6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem'
                          }}
                        >
                          💬 Start Chat
                        </button>
                      )}
                      
                      {message.status === 'in-chat' && (
                        <button
                          onClick={() => startChatSession(message._id)}
                          style={{
                            padding: '0.5rem 1rem',
                            background: '#c026d3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem'
                          }}
                        >
                          💬 Continue Chat
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setSelectedMessage(message._id)
                          setShowMeetingForm(true)
                        }}
                        style={{
                          padding: '0.5rem 1rem',
                          background: '#8b5cf6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.375rem',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
                        }}
                      >
                        📹 Set Meeting Links
                      </button>

                      {(message.status === 'in-chat' || message.status === 'in-call') && (
                        <button
                          onClick={() => updateMessageStatus(message._id, 'completed')}
                          style={{
                            padding: '0.5rem 1rem',
                            background: '#059669',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem'
                          }}
                        >
                          ✅ Complete Session
                        </button>
                      )}

                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete the conversation with ${message.name}?\n\nThis will permanently delete:\n• All chat messages\n• Payment information\n• User ratings\n• Uploaded files\n\nThis action cannot be undone.`)) {
                            deleteMessage(message._id)
                          }
                        }}
                        style={{
                          padding: '0.5rem 0.75rem',
                          background: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.375rem',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        🗑️ Delete Chat
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard