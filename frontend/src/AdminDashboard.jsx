import { useState, useEffect } from 'react'
import io from 'socket.io-client'

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

  // Socket connection setup
  useEffect(() => {
    const newSocket = io('http://localhost:5000')
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

      const response = await fetch('http://localhost:5000/api/messages', {
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

  const startChatSession = async (messageId) => {
    setActiveChat(messageId)
    const response = await fetch(`http://localhost:5000/api/messages/${messageId}`)
    if (response.ok) {
      const messageData = await response.json()
      setChatMessages(messageData.chatMessages || [])
    }
    updateMessageStatus(messageId, 'in-chat')
  }

  const updateMessageStatus = async (messageId, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`http://localhost:5000/api/messages/${messageId}/status`, {
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
      sender: 'admin'
    }

    setChatMessages(prev => [...prev, {
      sender: 'admin',
      message: newChatMessage.trim(),
      timestamp: new Date()
    }])
    
    socket.emit('send-chat-message', messageData)
    setNewChatMessage('')
  }

  const setMeetingLinksForMessage = async (messageId) => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`http://localhost:5000/api/messages/${messageId}/meeting-links`, {
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

  // Chat Interface
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

          <div style={{
            flex: 1,
            padding: '1rem 2rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
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

  // Calculate stats
  const pendingCount = messages.filter(msg => msg.status === 'pending').length
  const inChatCount = messages.filter(msg => msg.status === 'in-chat').length
  const inCallCount = messages.filter(msg => msg.status === 'in-call').length
  const completedCount = messages.filter(msg => msg.status === 'completed').length
  const paidCount = messages.filter(msg => msg.paymentStatus === 'paid').length
  const totalEarnings = messages
    .filter(msg => msg.paymentStatus === 'paid')
    .reduce((sum, msg) => sum + (msg.amountPaid || 0), 0)

  const ratedMessages = messages.filter(msg => msg.userRating)
  const avgRating = ratedMessages.length > 0 
    ? ratedMessages.reduce((sum, msg) => sum + msg.userRating.rating, 0) / ratedMessages.length
    : 0

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
                     notification.type === 'rating' ? '#c026d3' : '#3b82f6',
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
                  background: message.status === 'pending' ? '#fffbeb' : 
                             message.status === 'in-chat' ? '#fef7ff' :
                             message.status === 'in-call' ? '#dbeafe' : 'white'
                }}
              >
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