import { useState, useEffect } from 'react'
import AdminDashboard from './AdminDashboard'
import PaymentInterface from './PaymentInterface'
import CallInterface from './CallInterface'
import UserChat from './UserChat'
import io from 'socket.io-client'
import './index.css'

// Check URL parameters for routing
const urlParams = new URLSearchParams(window.location.search)
const isCallMode = window.location.pathname === '/call'
const isChatMode = window.location.pathname.startsWith('/chat/')
const messageId = urlParams.get('messageId') || (isChatMode ? window.location.pathname.split('/chat/')[1] : null)
const isAdminCall = urlParams.has('admin')
const isAdminMode = urlParams.has('admin') && !isCallMode
const userName = urlParams.get('name')

// User Chat Page Component
function UserChatPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      display: 'flex',
      alignItems: 'center'
    }}>
      <UserChat messageId={messageId} userName={userName || 'Anonymous'} />
    </div>
  )
}

// User Interface Component
function UserInterface() {
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [messageId, setMessageId] = useState(null)
  const [showPayment, setShowPayment] = useState(false)
  const [socket, setSocket] = useState(null)

  // Initialize Socket.io to listen for session completion
  useEffect(() => {
    if (messageId) {
      const newSocket = io('http://localhost:5000')
      setSocket(newSocket)

      // Listen for when admin marks session as completed
      newSocket.on('messageStatusUpdate', (data) => {
        if (data.id === messageId && data.status === 'completed') {
          // Show payment interface after a short delay
          setTimeout(() => {
            setShowPayment(true)
          }, 2000)
        }
      })

      return () => newSocket.close()
    }
  }, [messageId])

  const handleSubmit = async () => {
    if (message.trim()) {
      try {
        const response = await fetch('http://localhost:5000/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: message.trim(),
            name: name.trim(),
            isAnonymous
          })
        });

        if (response.ok) {
          const result = await response.json();
          
          // Redirect to chat instead of showing success message
          const chatUrl = `/chat/${result.id}?name=${encodeURIComponent(name.trim() || 'Anonymous')}`
          window.location.href = chatUrl
        } else {
          alert('Failed to send message. Please try again.');
        }
      } catch (error) {
        alert('Error sending message. Please check your connection.');
      }
    }
  }

  // Show payment interface
  if (showPayment && messageId) {
    return (
      <PaymentInterface 
        messageId={messageId}
        onPaymentComplete={(amount) => {
          setShowPayment(false)
          alert(`Thank you for your payment of ₹${amount}! Your support helps us continue providing counseling services.`)
        }}
        onSkip={() => {
          setShowPayment(false)
          alert('Thank you for using our support service. We hope it was helpful!')
        }}
      />
    )
  }

  if (submitted) {
    return (
      <div className="container">
        <div className="card success-container">
          <div className="success-icon">
            <svg width="32" height="32" fill="none" stroke="#16a34a" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="success-title">Message Sent Successfully!</h2>
          <p className="success-text">
            Your message has been received. A counselor will reach out to you soon for a support session.
          </p>
          <div className="success-note">
            Please keep this tab open. You'll be notified when your session is ready or when a video call is starting.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="card">
        <div>
          <h1 className="title">Share Your Feelings</h1>
          <p className="subtitle">
            You're not alone. Share what's on your mind and get personalized support from a caring counselor through video call.
          </p>
        </div>

        <div>
          {/* Anonymous Toggle */}
          <div className="toggle-container">
            <span className="toggle-label">Post Anonymously</span>
            <button
              type="button"
              onClick={() => setIsAnonymous(!isAnonymous)}
              className={`toggle ${isAnonymous ? 'active' : 'inactive'}`}
            >
              <span className={`toggle-dot ${isAnonymous ? 'active' : 'inactive'}`} />
            </button>
          </div>

          {/* Name Field */}
          {!isAnonymous && (
            <div className="form-group">
              <label htmlFor="name" className="label">
                Your Name (Optional)
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                placeholder="How would you like to be called?"
              />
            </div>
          )}

          {/* Message Field */}
          <div className="form-group">
            <label htmlFor="message" className="label">
              What's on your mind? *
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="textarea"
              placeholder="Share your thoughts, feelings, or what you're going through..."
            />
            <div className="char-counter">
              {message.length} characters
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!message.trim()}
            className="btn btn-primary"
          >
            Share My Feelings
          </button>
        </div>

        {/* Footer */}
        <div className="footer">
          <p>Your privacy is important to us. All conversations are confidential.</p>
          <p>• Free to share • Video call support • Pay what you feel it's worth •</p>
        </div>

        {/* Admin Access */}
        <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
          <button
            onClick={() => window.location.href = '/?admin=true'}
            style={{
              background: 'none',
              border: 'none',
              color: '#6b7280',
              fontSize: '0.75rem',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Counselor Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

// Main App Component with Routing
function App() {
  // Handle chat interface routing
  if (isChatMode && messageId) {
    return <UserChatPage />
  }

  // Handle call interface routing
  if (isCallMode && messageId) {
    return (
      <CallInterface 
        messageId={messageId}
        isAdmin={isAdminCall}
        onCallEnd={() => {
          if (window.opener) {
            window.close() // Close popup window
          } else {
            window.location.href = isAdminCall ? '/?admin=true' : '/'
          }
        }}
      />
    )
  }

  // Handle admin dashboard routing
  if (isAdminMode) {
    return <AdminDashboard />
  }

  // Default to user interface
  return <UserInterface />
}

export default App