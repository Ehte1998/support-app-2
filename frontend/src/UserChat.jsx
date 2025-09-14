import { useState, useEffect } from 'react'
import io from 'socket.io-client'

function UserChat({ messageId, userName }) {
  const [conversation, setConversation] = useState(null)
  const [socket, setSocket] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [incomingCall, setIncomingCall] = useState(null)

  // Initialize Socket.io connection
  useEffect(() => {
    if (!messageId) return

    const newSocket = io('http://localhost:5000')
    setSocket(newSocket)

    newSocket.emit('join-message-room', messageId)

    newSocket.on('newReply', ({ messageId: replyMessageId, reply }) => {
      if (replyMessageId === messageId) {
        setConversation(prev => prev ? {
          ...prev,
          replies: [...(prev.replies || []), reply]
        } : null)
      }
    })

    newSocket.on('incoming-call', ({ messageId: callMessageId, callType }) => {
      if (callMessageId === messageId) {
        setIncomingCall({
          messageId: callMessageId,
          callType,
          timestamp: Date.now()
        })
        
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Incoming Call', {
            body: `The counselor wants to start a ${callType} call with you`,
            icon: '/favicon.ico',
            requireInteraction: true
          })
        }
      }
    })

    newSocket.on('messageStatusUpdate', ({ id, status }) => {
      if (id === messageId) {
        setConversation(prev => prev ? { ...prev, status } : null)
      }
    })

    newSocket.on('room-joined', (roomId) => {
      console.log('Joined message room:', roomId)
    })

    newSocket.on('adminStatusChanged', (status) => {
      console.log('Admin status changed to:', status)
    })

    return () => newSocket.close()
  }, [messageId])

  const fetchConversation = async () => {
    if (!messageId) return

    try {
      const response = await fetch(`http://localhost:5000/api/messages`)
      if (response.ok) {
        const messages = await response.json()
        const currentMessage = messages.find(msg => msg._id === messageId)
        setConversation(currentMessage)
      }
    } catch (error) {
      console.error('Error fetching conversation:', error)
    } finally {
      setLoading(false)
    }
  }

  const acceptCall = () => {
    if (incomingCall) {
      if (socket) {
        socket.emit('user-accept-call', { messageId: incomingCall.messageId })
      }
      
      const callUrl = `/call?messageId=${messageId}&userJoin=true`
      window.open(callUrl, `call_${messageId}`, 'width=1000,height=700,scrollbars=no,resizable=yes')
      
      setIncomingCall(null)
    }
  }

  const rejectCall = () => {
    if (incomingCall) {
      if (socket) {
        socket.emit('user-reject-call', { messageId: incomingCall.messageId })
      }
      
      setIncomingCall(null)
    }
  }

  const initiateUserCall = (callType) => {
    if (socket) {
      socket.emit('user-start-call', { 
        messageId, 
        callType 
      })
    }
    
    if (callType === 'webrtc') {
      const callUrl = `/call?messageId=${messageId}&userJoin=true`
      window.open(callUrl, `call_${messageId}`, 'width=1000,height=700,scrollbars=no,resizable=yes')
    } else if (callType === 'google-meet') {
      const googleMeetLink = `https://meet.google.com/new`
      const message = `I'd like to have a counseling session. Please join: ${googleMeetLink}`
      
      navigator.clipboard.writeText(message).then(() => {
        alert('Google Meet link copied to clipboard! The counselor has been notified.')
      }).catch(() => {
        prompt('Google Meet Link - Share this with the counselor:', message)
      })
    } else if (callType === 'zoom') {
      const zoomLink = `https://zoom.us/start/videomeeting`
      const message = `I'd like to have a counseling session. Please join: ${zoomLink}`
      
      navigator.clipboard.writeText(message).then(() => {
        alert('Zoom meeting link copied to clipboard! The counselor has been notified.')
      }).catch(() => {
        prompt('Zoom Meeting Link - Share this with the counselor:', message)
      })
    }
  }

  const sendReply = async () => {
    if (!replyText.trim() || !messageId || sending) return

    setSending(true)
    try {
      const response = await fetch(`${API_URL}/api/messages/${messageId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: replyText.trim(),
          sender: 'user'
        })
      })

      if (response.ok) {
        const replyData = await response.json()
        
        setConversation(prev => prev ? {
          ...prev,
          replies: [...(prev.replies || []), replyData.reply]
        } : null)

        setReplyText('')
      }
    } catch (error) {
      console.error('Error sending reply:', error)
    } finally {
      setSending(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendReply()
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString()
    }
  }

  useEffect(() => {
    fetchConversation()
    
    const interval = setInterval(fetchConversation, 30000)
    return () => clearInterval(interval)
  }, [messageId])

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px',
        background: '#f8fafc',
        borderRadius: '1rem'
      }}>
        <div style={{ color: '#6b7280', fontSize: '1rem' }}>Loading conversation...</div>
      </div>
    )
  }

  if (!conversation) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '3rem',
        background: '#f8fafc',
        borderRadius: '1rem',
        color: '#6b7280'
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💭</div>
        <div>Conversation not found</div>
        <button
          onClick={() => window.location.href = '/'}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}
        >
          Go Back Home
        </button>
      </div>
    )
  }

  return (
    <div>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }
        `}
      </style>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '1rem',
        background: 'white',
        borderRadius: '1rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        minHeight: '500px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {incomingCall && (
          <div style={{
            background: '#fef3c7',
            border: '2px solid #f59e0b',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginBottom: '1rem',
            animation: 'pulse 2s infinite'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#92400e',
                  marginBottom: '0.5rem'
                }}>
                  📞 Incoming Call from Counselor
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#78350f'
                }}>
                  The counselor wants to start a {incomingCall.callType.replace('-', ' ')} session with you
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={acceptCall}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                >
                  Accept Call
                </button>
                <button
                  onClick={rejectCall}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        )}

        <div style={{ 
          borderBottom: '2px solid #e5e7eb',
          paddingBottom: '1rem',
          marginBottom: '1rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600', 
              color: '#1f2937',
              margin: '0 0 0.5rem 0'
            }}>
              Your Support Conversation
            </h2>
            <button
              onClick={() => window.location.href = '/'}
              style={{
                padding: '0.5rem 1rem',
                background: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Back to Home
            </button>
          </div>
          <div style={{ 
            fontSize: '0.875rem', 
            color: '#6b7280',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>Status: </span>
            <span style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: '500',
              background: conversation.status === 'pending' ? '#fef3c7' : 
                         conversation.status === 'in-call' ? '#dbeafe' : '#dcfce7',
              color: conversation.status === 'pending' ? '#92400e' : 
                     conversation.status === 'in-call' ? '#1e40af' : '#15803d'
            }}>
              {conversation.status.toUpperCase()}
            </span>
            
            {conversation.status === 'in-call' && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                padding: '0.5rem',
                background: '#dbeafe',
                borderRadius: '0.375rem'
              }}>
                <div style={{ fontSize: '0.75rem', color: '#1e40af' }}>
                  Call session active - counselor is ready to connect
                </div>
              </div>
            )}
          </div>
          
          {conversation.status === 'pending' && (
            <div style={{ 
              marginTop: '1rem',
              padding: '1rem',
              background: '#f8fafc',
              borderRadius: '0.5rem',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ 
                fontSize: '0.875rem', 
                fontWeight: '500', 
                color: '#374151',
                marginBottom: '0.75rem'
              }}>
                Ready to talk? Start a session:
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => initiateUserCall('webrtc')}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  📹 Start Video Call
                </button>
                <button
                  onClick={() => initiateUserCall('google-meet')}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#4285f4',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  📱 Google Meet
                </button>
                <button
                  onClick={() => initiateUserCall('zoom')}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#2D8CFF',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  📱 Zoom Meeting
                </button>
              </div>
              <div style={{ 
                fontSize: '0.75rem', 
                color: '#6b7280', 
                marginTop: '0.5rem' 
              }}>
                This will notify the counselor that you're ready for a session
              </div>
            </div>
          )}
        </div>

        <div style={{ 
          flex: 1,
          overflowY: 'auto',
          marginBottom: '1rem',
          padding: '0.5rem'
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ 
              fontSize: '0.75rem', 
              color: '#6b7280', 
              marginBottom: '0.5rem' 
            }}>
              {formatDate(conversation.timestamp)} at {formatTime(conversation.timestamp)}
            </div>
            <div style={{
              background: '#f0f9ff',
              padding: '1rem',
              borderRadius: '0.75rem',
              borderLeft: '4px solid #3b82f6',
              marginLeft: '0',
              maxWidth: '85%'
            }}>
              <div style={{ 
                fontSize: '0.75rem', 
                color: '#3b82f6', 
                fontWeight: '500',
                marginBottom: '0.25rem' 
              }}>
                You
              </div>
              <div style={{ color: '#1e40af', lineHeight: '1.5' }}>
                {conversation.message}
              </div>
            </div>
          </div>

          {conversation.replies && conversation.replies.map((reply, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              <div style={{ 
                fontSize: '0.75rem', 
                color: '#6b7280', 
                marginBottom: '0.5rem',
                textAlign: reply.sender === 'admin' ? 'left' : 'right'
              }}>
                {formatTime(reply.timestamp)}
              </div>
              <div style={{
                display: 'flex',
                justifyContent: reply.sender === 'admin' ? 'flex-start' : 'flex-end'
              }}>
                <div style={{
                  background: reply.sender === 'admin' ? '#f0fdf4' : '#f0f9ff',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  borderLeft: reply.sender === 'admin' ? '4px solid #10b981' : '4px solid #3b82f6',
                  maxWidth: '85%'
                }}>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    color: reply.sender === 'admin' ? '#059669' : '#3b82f6', 
                    fontWeight: '500',
                    marginBottom: '0.25rem' 
                  }}>
                    {reply.sender === 'admin' ? 'Counselor' : 'You'}
                  </div>
                  <div style={{ 
                    color: reply.sender === 'admin' ? '#065f46' : '#1e40af', 
                    lineHeight: '1.5' 
                  }}>
                    {reply.message}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {(!conversation.replies || conversation.replies.length === 0 || 
            conversation.replies[conversation.replies.length - 1].sender === 'user') && (
            <div style={{ 
              textAlign: 'center', 
              padding: '2rem',
              color: '#6b7280',
              fontSize: '0.875rem'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💭</div>
              <div>Waiting for counselor response...</div>
              <div style={{ marginTop: '0.25rem', fontSize: '0.75rem' }}>
                You'll be notified when they reply
              </div>
            </div>
          )}
        </div>

        <div style={{ 
          borderTop: '1px solid #e5e7eb',
          paddingTop: '1rem'
        }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <textarea
              placeholder="Type your message..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={sending}
              style={{
                flex: 1,
                minHeight: '60px',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
            <button
              onClick={sendReply}
              disabled={!replyText.trim() || sending}
              style={{
                padding: '0.75rem 1.5rem',
                background: replyText.trim() && !sending ? '#10b981' : '#d1d5db',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: replyText.trim() && !sending ? 'pointer' : 'not-allowed',
                fontSize: '0.875rem',
                fontWeight: '500',
                minWidth: '80px'
              }}
            >
              {sending ? '...' : 'Send'}
            </button>
          </div>
          <div style={{ 
            fontSize: '0.75rem', 
            color: '#6b7280', 
            marginTop: '0.5rem' 
          }}>
            Press Enter to send, Shift+Enter for new line
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserChat