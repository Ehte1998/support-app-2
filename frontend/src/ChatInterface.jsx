import { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'

// Get API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function ChatInterface({ messageId, isAdmin = false, initialMessage = null }) {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [meetingLinks, setMeetingLinks] = useState({ googleMeet: '', zoom: '' })
  const [showMeetingLinks, setShowMeetingLinks] = useState(false)
  const [messageData, setMessageData] = useState(null)
  const [showCallNotification, setShowCallNotification] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize socket and fetch message data
  useEffect(() => {
    if (!messageId) return

    const newSocket = io(API_URL)
    setSocket(newSocket)

    // Join appropriate rooms
    if (isAdmin) {
      newSocket.emit('join-admin')
    } else {
      newSocket.emit('join-message-room', messageId)
    }

    // Fetch initial message data
    fetch(`${API_URL}/api/messages/${messageId}`)
      .then(res => res.json())
      .then(data => {
        setMessageData(data)
        setMessages(data.chatMessages || [])
        setMeetingLinks(data.meetingLinks || { googleMeet: '', zoom: '' })
      })
      .catch(console.error)

    // Socket event listeners
    newSocket.on('connect', () => {
      setIsConnected(true)
    })

    newSocket.on('disconnect', () => {
      setIsConnected(false)
    })

    newSocket.on('newChatMessage', (data) => {
      if (data.messageId === messageId) {
        setMessages(prev => [...prev, data.chatMessage])
      }
    })

    newSocket.on('meetingLinksUpdate', (data) => {
      if (data.messageId === messageId) {
        setMeetingLinks(data.meetingLinks)
      }
    })

    newSocket.on('callNotification', (data) => {
      if (data.messageId === messageId && !isAdmin) {
        setShowCallNotification(true)
        setMeetingLinks(data.meetingLinks || meetingLinks)
      }
    })

    newSocket.on('sessionCompleted', (data) => {
      if (data.messageId === messageId && !isAdmin) {
        // This will be handled by the parent component
        window.postMessage({ type: 'SESSION_COMPLETED', messageId }, '*')
      }
    })

    return () => newSocket.close()
  }, [messageId, isAdmin])

  const sendMessage = async () => {
    if (!newMessage.trim() || !socket) return

    const messageData = {
      messageId,
      message: newMessage.trim(),
      sender: isAdmin ? 'admin' : 'user'
    }

    // Send via socket for real-time update
    socket.emit('send-chat-message', messageData)

    // Clear input
    setNewMessage('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const updateMeetingLinks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/messages/${messageId}/meeting-links`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meetingLinks)
      })

      if (response.ok) {
        setShowMeetingLinks(false)
        alert('Meeting links updated successfully!')
      }
    } catch (error) {
      console.error('Error updating meeting links:', error)
      alert('Failed to update meeting links')
    }
  }

  const sendCallNotification = async () => {
    try {
      const response = await fetch(`${API_URL}/api/messages/${messageId}/send-call-notification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })

      if (response.ok) {
        alert('Call notification sent to user!')
      }
    } catch (error) {
      console.error('Error sending call notification:', error)
      alert('Failed to send call notification')
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const joinMeeting = (link) => {
    if (link) {
      window.open(link, '_blank')
    } else {
      alert('Meeting link not available yet')
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      maxHeight: '600px',
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '1rem',
        borderBottom: '1px solid #e5e7eb',
        background: '#f9fafb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h3 style={{ margin: 0, color: '#1f2937', fontSize: '1.1rem' }}>
            {isAdmin ? `Chat with ${messageData?.name || 'User'}` : 'Chat with Counselor'}
          </h3>
          <div style={{ 
            fontSize: '0.875rem', 
            color: isConnected ? '#10b981' : '#ef4444',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: '0.25rem'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: isConnected ? '#10b981' : '#ef4444'
            }} />
            {isConnected ? 'Connected' : 'Disconnected'}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {isAdmin && (
            <>
              <button
                onClick={() => setShowMeetingLinks(!showMeetingLinks)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                📹 Meeting Links
              </button>
              <button
                onClick={sendCallNotification}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                🔔 Notify Call
              </button>
            </>
          )}
        </div>
      </div>

      {/* Call Notification for User */}
      {showCallNotification && !isAdmin && (
        <div style={{
          background: '#dbeafe',
          border: '1px solid #3b82f6',
          padding: '1rem',
          margin: '1rem',
          borderRadius: '0.5rem',
          textAlign: 'center'
        }}>
          <div style={{ color: '#1e40af', fontWeight: '600', marginBottom: '1rem' }}>
            🔔 Your counselor is ready for a video call!
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            {meetingLinks.googleMeet && (
              <button
                onClick={() => joinMeeting(meetingLinks.googleMeet)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer'
                }}
              >
                📹 Join Google Meet
              </button>
            )}
            {meetingLinks.zoom && (
              <button
                onClick={() => joinMeeting(meetingLinks.zoom)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer'
                }}
              >
                📹 Join Zoom
              </button>
            )}
            <button
              onClick={() => setShowCallNotification(false)}
              style={{
                padding: '0.5rem 1rem',
                background: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer'
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Meeting Links Panel for Admin */}
      {showMeetingLinks && isAdmin && (
        <div style={{
          background: '#f3f4f6',
          padding: '1rem',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Meeting Links</h4>
          <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem' }}>
                Google Meet Link:
              </label>
              <input
                type="url"
                value={meetingLinks.googleMeet}
                onChange={(e) => setMeetingLinks(prev => ({ ...prev, googleMeet: e.target.value }))}
                placeholder="https://meet.google.com/xxx-xxxx-xxx"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem' }}>
                Zoom Link:
              </label>
              <input
                type="url"
                value={meetingLinks.zoom}
                onChange={(e) => setMeetingLinks(prev => ({ ...prev, zoom: e.target.value }))}
                placeholder="https://zoom.us/j/xxxxxxxxx"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem'
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={updateMeetingLinks}
              style={{
                padding: '0.5rem 1rem',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Update Links
            </button>
            <button
              onClick={() => setShowMeetingLinks(false)}
              style={{
                padding: '0.5rem 1rem',
                background: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div style={{
        flex: 1,
        padding: '1rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {messages.length === 0 ? (
          <div style={{
            textAlign: 'center',
            color: '#6b7280',
            fontSize: '0.875rem',
            marginTop: '2rem'
          }}>
            {isAdmin ? 'Start the conversation...' : 'Counselor will respond shortly...'}
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: msg.sender === (isAdmin ? 'admin' : 'user') ? 'flex-end' : 'flex-start'
              }}
            >
              <div style={{
                maxWidth: '70%',
                padding: '0.75rem 1rem',
                borderRadius: '1rem',
                background: msg.sender === (isAdmin ? 'admin' : 'user') 
                  ? '#3b82f6' 
                  : '#f3f4f6',
                color: msg.sender === (isAdmin ? 'admin' : 'user') 
                  ? 'white' 
                  : '#374151',
                wordWrap: 'break-word'
              }}>
                <div style={{ fontSize: '0.875rem', lineHeight: '1.4' }}>
                  {msg.message}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  marginTop: '0.5rem',
                  opacity: 0.7
                }}>
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{
        padding: '1rem',
        borderTop: '1px solid #e5e7eb',
        background: 'white'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isAdmin ? "Type your response..." : "Type your message..."}
            rows={2}
            style={{
              flex: 1,
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              resize: 'none',
              fontSize: '0.875rem',
              fontFamily: 'inherit'
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim() || !isConnected}
            style={{
              padding: '0.75rem 1.5rem',
              background: (!newMessage.trim() || !isConnected) ? '#d1d5db' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: (!newMessage.trim() || !isConnected) ? 'not-allowed' : 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            Send
          </button>
        </div>
        <div style={{
          fontSize: '0.75rem',
          color: '#6b7280',
          marginTop: '0.5rem',
          textAlign: 'center'
        }}>
          Press Enter to send • Shift+Enter for new line
        </div>
      </div>
    </div>
  )
}

export default ChatInterface