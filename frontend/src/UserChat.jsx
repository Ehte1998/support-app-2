// Updated UserChat.jsx - Fixed quick payment buttons and Razorpay integration
import { useState, useEffect } from 'react'
import io from 'socket.io-client'

// Get API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Rating Component
function RatingComponent({ onRatingSubmit }) {
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [hoveredRating, setHoveredRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Please select a rating before submitting')
      return
    }
    
    onRatingSubmit(rating, feedback)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{
        padding: '1.5rem',
        background: '#dcfce7',
        border: '1px solid #bbf7d0',
        borderRadius: '0.5rem',
        textAlign: 'center'
      }}>
        <div style={{ color: '#166534', fontWeight: '600', marginBottom: '0.5rem' }}>
          Thank you for your feedback!
        </div>
        <div style={{ color: '#15803d', fontSize: '0.875rem' }}>
          Your rating helps us improve our counseling services.
        </div>
      </div>
    )
  }

  return (
    <div style={{
      padding: '1.5rem',
      background: '#fef7ff',
      border: '1px solid #e879f9',
      borderRadius: '0.5rem'
    }}>
      <div style={{
        fontSize: '1rem',
        fontWeight: '600',
        color: '#86198f',
        marginBottom: '1rem',
        textAlign: 'center'
      }}>
        How was your counseling experience?
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.25rem',
        marginBottom: '1rem'
      }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '2rem',
              cursor: 'pointer',
              color: (hoveredRating || rating) >= star ? '#fbbf24' : '#d1d5db',
              transition: 'color 0.2s'
            }}
          >
            ★
          </button>
        ))}
      </div>

      <div style={{
        textAlign: 'center',
        fontSize: '0.875rem',
        color: '#6b7280',
        marginBottom: '1rem'
      }}>
        {rating === 0 ? 'Click a star to rate' :
         rating === 1 ? 'Poor' :
         rating === 2 ? 'Fair' :
         rating === 3 ? 'Good' :
         rating === 4 ? 'Very Good' :
         'Excellent'}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{
          display: 'block',
          fontSize: '0.875rem',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '0.5rem'
        }}>
          Additional feedback (optional):
        </label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Share your thoughts about the counseling session..."
          rows={3}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            resize: 'vertical'
          }}
        />
      </div>

      <div style={{
        display: 'flex',
        gap: '0.5rem',
        justifyContent: 'center'
      }}>
        <button
          onClick={handleSubmit}
          style={{
            padding: '0.75rem 1.5rem',
            background: rating > 0 ? '#c026d3' : '#d1d5db',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: rating > 0 ? 'pointer' : 'not-allowed',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}
        >
          Submit Rating
        </button>
      </div>
    </div>
  )
}

function PaymentInterface({ messageId, onPaymentComplete, onSkip }) {
  const [customAmount, setCustomAmount] = useState('')
  const [selectedAmount, setSelectedAmount] = useState(100)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const predefinedAmounts = [500, 1000, 2000, 5000, 10000]

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const initiatePayment = async (amount) => {
    setLoading(true)
    setMessage('')

    try {
      const orderResponse = await fetch(`${API_URL}/api/create-payment-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          messageId: messageId
        })
      })

      const orderData = await orderResponse.json()

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create payment order')
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Support Counseling',
        description: 'Thank you for supporting our counseling services',
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            const verificationResponse = await fetch(`${API_URL}/api/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                messageId: messageId,
                amount: orderData.amount
              })
            })

            const verificationData = await verificationResponse.json()

            if (verificationData.success) {
              setMessage('Payment successful! Thank you for your support.')
              setTimeout(() => {
                onPaymentComplete(amount)
              }, 2000)
            } else {
              setMessage('Payment verification failed. Please contact support.')
            }
          } catch (error) {
            setMessage('Payment verification failed. Please contact support.')
            console.error('Payment verification error:', error)
          }
        },
        prefill: {
          name: 'Anonymous User',
        },
        theme: {
          color: '#3b82f6'
        },
        modal: {
          ondismiss: function() {
            setLoading(false)
            setMessage('Payment cancelled')
          }
        }
      }

      if (window.Razorpay) {
        const rzp1 = new window.Razorpay(options)
        rzp1.open()
      } else {
        throw new Error('Razorpay not loaded')
      }

    } catch (error) {
      setMessage('Payment failed. Please try again.')
      console.error('Payment error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePredefinedAmount = (amount) => {
    setSelectedAmount(amount)
    setCustomAmount('')
  }

  const handleCustomAmount = (value) => {
    setCustomAmount(value)
    setSelectedAmount(null)
  }

  const handlePayment = () => {
    const amount = customAmount ? parseInt(customAmount) : selectedAmount
    
    if (!amount || amount < 1) {
      setMessage('Please enter a valid amount')
      return
    }

    if (amount > 100000) {
      setMessage('Maximum amount is ₹1,00,000')
      return
    }

    initiatePayment(amount)
  }

  const currentAmount = customAmount ? parseInt(customAmount) : selectedAmount

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        padding: '3rem',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            fontSize: '2rem'
          }}>
            💚
          </div>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: '0 0 0.5rem 0'
          }}>
            Session Completed!
          </h2>
          <p style={{
            color: '#6b7280',
            fontSize: '1rem',
            lineHeight: '1.6',
            margin: 0
          }}>
            We hope our counseling session was helpful. Your support helps us continue providing mental health services to those in need.
          </p>
        </div>

        {message && (
          <div style={{
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
            textAlign: 'center',
            background: message.includes('successful') ? '#dcfce7' : 
                       message.includes('failed') || message.includes('cancelled') ? '#fef2f2' : '#fef3c7',
            color: message.includes('successful') ? '#166534' : 
                   message.includes('failed') || message.includes('cancelled') ? '#991b1b' : '#92400e',
            border: `1px solid ${message.includes('successful') ? '#bbf7d0' : 
                                 message.includes('failed') || message.includes('cancelled') ? '#fecaca' : '#fed7aa'}`
          }}>
            {message}
          </div>
        )}

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '1rem'
          }}>
            Choose an amount to support our services:
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
            {predefinedAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => handlePredefinedAmount(amount)}
                style={{
                  padding: '1rem 0.5rem',
                  border: selectedAmount === amount ? '2px solid #3b82f6' : '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  background: selectedAmount === amount ? '#eff6ff' : 'white',
                  color: selectedAmount === amount ? '#1d4ed8' : '#374151',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  textAlign: 'center',
                  transition: 'all 0.2s'
                }}
              >
                ₹{amount}
              </button>
            ))}
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Or enter a custom amount:
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6b7280',
                fontSize: '1rem'
              }}>
                ₹
              </span>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => handleCustomAmount(e.target.value)}
                placeholder="Enter amount"
                min="1"
                max="100000"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2rem',
                  border: customAmount ? '2px solid #3b82f6' : '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  background: customAmount ? '#eff6ff' : 'white'
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button
            onClick={handlePayment}
            disabled={loading || !currentAmount || currentAmount < 1}
            style={{
              width: '100%',
              padding: '1rem',
              background: loading || !currentAmount || currentAmount < 1 ? '#d1d5db' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading || !currentAmount || currentAmount < 1 ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            {loading ? 'Processing...' : `💳 Pay ₹${currentAmount || 0}`}
          </button>

          <button
            onClick={onSkip}
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'transparent',
              color: '#6b7280',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Skip Payment
          </button>
        </div>
      </div>
    </div>
  )
}

// Meeting Links Component with Authentication
// Fixed MeetingLinksButtons Component with proper debugging
// Updated MeetingLinksButtons Component with Landing Page URLs
function MeetingLinksButtons({ messageId, user }) {
  const [meetingLinks, setMeetingLinks] = useState({})
  const [showLinkForm, setShowLinkForm] = useState(false)
  const [userLinks, setUserLinks] = useState({ googleMeet: '', zoom: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Fetch meeting links on component mount
  useEffect(() => {
    const checkMeetingLinks = async () => {
      try {
        if (!messageId) return
        
        const response = await fetch(`${API_URL}/api/messages/${messageId}`)
        if (response.ok) {
          const messageData = await response.json()
          setMeetingLinks(messageData.meetingLinks || {})
        }
      } catch (error) {
        console.error('Error fetching meeting links:', error)
      }
    }

    checkMeetingLinks()
  }, [messageId])

  const handleSetUserLinks = async () => {
    if (!userLinks.googleMeet.trim() && !userLinks.zoom.trim()) {
      setError('Please enter at least one meeting link')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const token = localStorage.getItem('userToken')
      if (!token) {
        setError('Please log in again')
        setLoading(false)
        return
      }

      const response = await fetch(`${API_URL}/api/messages/${messageId}/user-meeting-links`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          googleMeet: userLinks.googleMeet.trim(),
          zoom: userLinks.zoom.trim()
        })
      })

      if (response.ok) {
        const result = await response.json()
        setMeetingLinks(result.meetingLinks || {})
        setShowLinkForm(false)
        setUserLinks({ googleMeet: '', zoom: '' })
        setError('')
      } else {
        setError('Failed to set meeting links')
      }
    } catch (error) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelForm = () => {
    setShowLinkForm(false)
    setUserLinks({ googleMeet: '', zoom: '' })
    setError('')
  }

  const handleOpenForm = () => {
    setShowLinkForm(true)
    setError('')
  }

  // FORM VIEW - Only show if explicitly opened
  if (showLinkForm === true) {
    return (
      <div style={{ 
        padding: '1rem', 
        background: '#f9fafb', 
        borderRadius: '0.5rem',
        border: '1px solid #e5e7eb',
        width: '100%'
      }}>
        <h4 style={{ 
          margin: '0 0 1rem 0', 
          fontSize: '0.875rem', 
          fontWeight: '600',
          color: '#374151'
        }}>
          Set Your Meeting Links
        </h4>
        
        {error && (
          <div style={{
            padding: '0.5rem',
            background: '#fef2f2',
            color: '#991b1b',
            border: '1px solid #fecaca',
            borderRadius: '0.25rem',
            fontSize: '0.75rem',
            marginBottom: '0.75rem'
          }}>
            {error}
          </div>
        )}
        
        <div style={{ marginBottom: '0.75rem' }}>
          <input
            type="url"
            value={userLinks.googleMeet}
            onChange={(e) => setUserLinks(prev => ({ ...prev, googleMeet: e.target.value }))}
            placeholder="Your Google Meet link (optional)"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              marginBottom: '0.5rem'
            }}
          />
          <input
            type="url"
            value={userLinks.zoom}
            onChange={(e) => setUserLinks(prev => ({ ...prev, zoom: e.target.value }))}
            placeholder="Your Zoom link (optional)"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.25rem',
              fontSize: '0.75rem'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handleSetUserLinks}
            disabled={loading || (!userLinks.googleMeet.trim() && !userLinks.zoom.trim())}
            style={{
              padding: '0.5rem 0.75rem',
              background: (loading || (!userLinks.googleMeet.trim() && !userLinks.zoom.trim())) ? '#d1d5db' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: (loading || (!userLinks.googleMeet.trim() && !userLinks.zoom.trim())) ? 'not-allowed' : 'pointer',
              fontSize: '0.75rem',
              fontWeight: '500'
            }}
          >
            {loading ? 'Setting...' : 'Set Links'}
          </button>
          <button
            onClick={handleCancelForm}
            disabled={loading}
            style={{
              padding: '0.5rem 0.75rem',
              background: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '0.75rem'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  // BUTTONS VIEW - Default view with static and custom links
  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
      {/* Static Google Meet Button - Always Available with Landing Page */}
      <button
        onClick={() => {
          console.log('Opening Google Meet Landing Page')
          window.open('https://meet.google.com/landing', '_blank')
        }}
        style={{
          padding: '0.5rem 0.75rem',
          background: '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer',
          fontWeight: '500',
          fontSize: '0.875rem'
        }}
      >
        📱 Google Meet
      </button>
      
      {/* Static Zoom Button - Always Available with Landing Page */}
      <button
        onClick={() => {
          console.log('Opening Zoom Landing Page')
          window.open('https://zoom.us/start/videomeeting', '_blank')
        }}
        style={{
          padding: '0.5rem 0.75rem',
          background: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer',
          fontWeight: '500',
          fontSize: '0.875rem'
        }}
      >
        📱 Zoom
      </button>

      {/* User's Custom Google Meet Link */}
      {meetingLinks?.userGoogleMeet && (
        <button
          onClick={() => {
            console.log('Opening user Google Meet:', meetingLinks.userGoogleMeet)
            window.open(meetingLinks.userGoogleMeet, '_blank')
          }}
          style={{
            padding: '0.5rem 0.75rem',
            background: '#059669',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '0.875rem'
          }}
        >
          📹 My Google Meet
        </button>
      )}
      
      {/* User's Custom Zoom Link */}
      {meetingLinks?.userZoom && (
        <button
          onClick={() => {
            console.log('Opening user Zoom:', meetingLinks.userZoom)
            window.open(meetingLinks.userZoom, '_blank')
          }}
          style={{
            padding: '0.5rem 0.75rem',
            background: '#1d4ed8',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '0.875rem'
          }}
        >
          📹 My Zoom Room
        </button>
      )}
      
      {/* Set Custom Links Button */}
      <button
        onClick={handleOpenForm}
        style={{
          padding: '0.4rem 0.6rem',
          background: '#f3f4f6',
          color: '#374151',
          border: '1px solid #d1d5db',
          borderRadius: '0.375rem',
          cursor: 'pointer',
          fontSize: '0.75rem',
          fontWeight: '500'
        }}
      >
        + Set My Links
      </button>
    </div>
  )
}

// Quick Payment Function
function makeQuickPayment(amount, messageId) {
  return new Promise((resolve, reject) => {
    // Load Razorpay script if not already loaded
    if (!window.Razorpay) {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => processPayment(amount, messageId, resolve, reject)
      script.onerror = () => reject('Failed to load Razorpay')
      document.head.appendChild(script)
    } else {
      processPayment(amount, messageId, resolve, reject)
    }
  })
}

async function processPayment(amount, messageId, resolve, reject) {
  try {
    const orderResponse = await fetch(`${API_URL}/api/create-payment-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: amount, messageId: messageId })
    })

    const orderData = await orderResponse.json()

    if (!orderData.success) {
      throw new Error(orderData.error || 'Failed to create payment order')
    }

    const options = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'Support Counseling',
      description: 'Thank you for supporting our counseling services',
      order_id: orderData.orderId,
      handler: async function (response) {
        try {
          const verificationResponse = await fetch(`${API_URL}/api/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              messageId: messageId,
              amount: orderData.amount
            })
          })

          const verificationData = await verificationResponse.json()
          if (verificationData.success) {
            resolve(`Payment of ₹${amount} successful! Thank you for your support.`)
          } else {
            reject('Payment verification failed. Please contact support.')
          }
        } catch (error) {
          reject('Payment verification failed. Please contact support.')
        }
      },
      modal: {
        ondismiss: function() {
          reject('Payment cancelled')
        }
      },
      theme: { color: '#3b82f6' }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  } catch (error) {
    reject('Payment failed. Please try again.')
  }
}

// Main User Interface Component with Immediate Chat Access
function SimplifiedUserInterface({ user }) {
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [messageId, setMessageId] = useState(null)
  const [socket, setSocket] = useState(null)
  const [sessionStatus, setSessionStatus] = useState('pending')
  const [callNotification, setCallNotification] = useState(null)
  const [showPayment, setShowPayment] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [newChatMessage, setNewChatMessage] = useState('')
  const [userCompletedSession, setUserCompletedSession] = useState(false)
  const [showRating, setShowRating] = useState(false)

  // Handle user-initiated session completion
  const handleUserCompleteSession = async () => {
    if (confirm('Are you sure you want to end this counseling session?')) {
      try {
        const token = localStorage.getItem('userToken')
        const response = await fetch(`${API_URL}/api/messages/${messageId}/user-complete`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          setUserCompletedSession(true)
          setSessionStatus('completed')
          setShowChat(false)
          setShowRating(true)
          
          if (socket) {
            socket.emit('user-completed-session', {
              messageId: messageId,
              userName: user.name
            })
          }
        } else {
          alert('Failed to complete session. Please try again.')
        }
      } catch (error) {
        console.error('Error completing session:', error)
        alert('Error completing session. Please try again.')
      }
    }
  }

  // Handle rating submission
  const handleRatingSubmit = async (rating, feedback) => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await fetch(`${API_URL}/api/messages/${messageId}/rating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          rating: rating,
          feedback: feedback
        })
      })

      if (response.ok) {
        setTimeout(() => {
          setShowRating(false)
          setShowPayment(true)
        }, 2000)
      }
    } catch (error) {
      console.error('Error submitting rating:', error)
    }
  }

  useEffect(() => {
    if (messageId && user) {
      const newSocket = io(API_URL, {
        transports: ['websocket', 'polling']
      })
      setSocket(newSocket)

      newSocket.on('connect', () => {
        newSocket.emit('join-message-room', messageId)
        newSocket.emit('join-user-room', user.id)
      })

      newSocket.on('messageStatusUpdate', (data) => {
        if (data.id === messageId) {
          setSessionStatus(data.status)
          
          switch(data.status) {
            case 'in-chat':
              fetchChatMessages()
              break
            case 'completed':
              setShowChat(false)
              setShowPayment(true)
              break
            default:
              break
          }
        }
      })

      newSocket.on('sessionCompleted', (data) => {
        if (data.messageId === messageId) {
          setShowChat(false)
          setShowPayment(true)
        }
      })

      newSocket.on('newChatMessage', (data) => {
        if (data.messageId === messageId) {
          setChatMessages(prev => [...prev, data.chatMessage])
        }
      })

      newSocket.on('meetingLinksUpdate', (data) => {
        if (data.messageId === messageId && data.meetingLinks) {
          setCallNotification({
            messageId: messageId,
            message: 'Meeting links are now available!',
            meetingLinks: data.meetingLinks
          })
        }
      })

      fetchMessageData(messageId)

      return () => {
        newSocket.close()
      }
    }
  }, [messageId, user])

  useEffect(() => {
    if (user) {
      fetchUserMessages()
    }
  }, [user])

  const fetchUserMessages = async () => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await fetch(`${API_URL}/api/user/messages`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const messages = await response.json()
        if (messages.length > 0) {
          const latestMessage = messages[0]
          setMessageId(latestMessage._id)
          setSubmitted(true)
          
          if (latestMessage.status === 'completed') {
            setShowPayment(true)
          } else {
            setShowChat(true)
          }
        }
      }
    } catch (error) {
      console.error('Error fetching user messages:', error)
    }
  }

  const fetchMessageData = async (msgId) => {
    try {
      const response = await fetch(`${API_URL}/api/messages/${msgId}`)
      if (response.ok) {
        const messageData = await response.json()
        
        setSessionStatus(messageData.status)
        setChatMessages(messageData.chatMessages || [])
        
        if (messageData.status === 'completed') {
          setShowChat(false)
          setShowPayment(true)
        } else {
          setShowChat(true)
          setShowPayment(false)
        }
        
        if (messageData.meetingLinks && (messageData.meetingLinks.googleMeet || messageData.meetingLinks.zoom)) {
          setCallNotification({
            messageId: msgId,
            message: 'Your counselor is ready for a video call!',
            meetingLinks: messageData.meetingLinks
          })
        }
      }
    } catch (error) {
      console.error('Error fetching message data:', error)
    }
  }

  const fetchChatMessages = async () => {
    if (!messageId) return
    
    try {
      const response = await fetch(`${API_URL}/api/messages/${messageId}`)
      if (response.ok) {
        const messageData = await response.json()
        setChatMessages(messageData.chatMessages || [])
      }
    } catch (error) {
      console.error('Error fetching chat messages:', error)
    }
  }

  const sendChatMessage = () => {
    if (!newChatMessage.trim() || !socket || !messageId) return

    const messageData = {
      messageId: messageId,
      message: newChatMessage.trim(),
      sender: 'user'
    }

    socket.emit('send-chat-message', messageData)
    setNewChatMessage('')
  }

  const handleChatKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendChatMessage()
    }
  }

  const handleSubmit = async () => {
    if (message.trim() && user) {
      try {
        const token = localStorage.getItem('userToken')
        const response = await fetch(`${API_URL}/api/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            message: message.trim()
          })
        })

        if (response.ok) {
          const result = await response.json()
          
          setMessageId(result.id)
          setSubmitted(true)
          setShowChat(true)
          setSessionStatus('pending')
        } else {
          alert('Failed to send message. Please try again.')
        }
      } catch (error) {
        console.error('Error submitting message:', error)
        alert('Error sending message. Please check your connection.')
      }
    }
  }

  const joinMeeting = (link, platform) => {
    if (link) {
      window.open(link, '_blank')
    } else {
      alert(`${platform} link not available`)
    }
  }

  const startNewSession = () => {
    setSubmitted(false)
    setMessageId(null)
    setShowChat(false)
    setShowPayment(false)
    setSessionStatus('pending')
    setCallNotification(null)
    setChatMessages([])
    setMessage('')
  }

  // Show rating interface if user completed session
  if (showRating && userCompletedSession) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '3rem',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #c026d3, #a21caf)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '2rem'
            }}>
              ⭐
            </div>
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: 'bold',
              color: '#1f2937',
              margin: '0 0 0.5rem 0'
            }}>
              Session Complete!
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '1rem',
              lineHeight: '1.6',
              margin: 0
            }}>
              Thank you for using our counseling service. We'd love to hear about your experience.
            </p>
          </div>

          <RatingComponent onRatingSubmit={handleRatingSubmit} />
        </div>
      </div>
    )
  }

  if (showPayment && messageId) {
    return <PaymentInterface 
      messageId={messageId}
      onPaymentComplete={(amount) => {
        setShowPayment(false)
        alert(`Thank you for your payment of ₹${amount}! Your support helps us continue providing counseling services.`)
        startNewSession()
      }}
      onSkip={() => {
        alert('Thank you for using our support service. We hope it was helpful!')
        startNewSession()
      }}
    />
  }

  // Show chat immediately after message submission
  if (showChat && messageId) {
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
            background: '#f9fafb'
          }}>
            <div style={{ marginBottom: '1rem' }}>
              <h2 style={{ margin: 0, color: '#1f2937' }}>Chat with Counselor</h2>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                Status: <span style={{ 
                  color: sessionStatus === 'pending' ? '#f59e0b' :
                        sessionStatus === 'in-chat' ? '#10b981' : 
                        sessionStatus === 'in-call' ? '#3b82f6' : 
                        sessionStatus === 'completed' ? '#f59e0b' : '#6b7280',
                  fontWeight: '500'
                }}>
                  {sessionStatus === 'pending' ? 'Waiting for Counselor' :
                   sessionStatus === 'in-chat' ? 'In Chat' : 
                   sessionStatus === 'in-call' ? 'In Call' : 
                   sessionStatus === 'completed' ? 'Session Completed' : 'Pending'}
                </span>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  Video Call Options:
                </div>
                <MeetingLinksButtons messageId={messageId} user={user} />
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button
                  onClick={handleUserCompleteSession}
                  disabled={userCompletedSession || sessionStatus === 'completed'}
                  style={{
                    padding: '0.5rem 1rem',
                    background: userCompletedSession || sessionStatus === 'completed' ? '#d1d5db' : '#f59e0b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: userCompletedSession || sessionStatus === 'completed' ? 'not-allowed' : 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                >
                  {userCompletedSession || sessionStatus === 'completed' ? '✓ Session Ended' : 'End Session'}
                </button>

                <button
                  onClick={() => {
                    setShowChat(false)
                    setShowPayment(true)
                  }}
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
                  Payment Options
                </button>
                
                <button
                  onClick={startNewSession}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                >
                  New Session
                </button>
              </div>
            </div>
          </div>

          {callNotification && (
            <div style={{
              background: '#dbeafe',
              border: '1px solid #3b82f6',
              padding: '1rem',
              margin: '1rem',
              borderRadius: '0.5rem',
              textAlign: 'center'
            }}>
              <div style={{ color: '#1e40af', fontWeight: '600', marginBottom: '1rem' }}>
                {callNotification.message}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                {callNotification.meetingLinks?.googleMeet && (
                  <button
                    onClick={() => joinMeeting(callNotification.meetingLinks.googleMeet, 'Google Meet')}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.25rem',
                      cursor: 'pointer'
                    }}
                  >
                    Join Google Meet
                  </button>
                )}
                {callNotification.meetingLinks?.zoom && (
                  <button
                    onClick={() => joinMeeting(callNotification.meetingLinks.zoom, 'Zoom')}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.25rem',
                      cursor: 'pointer'
                    }}
                  >
                    Join Zoom
                  </button>
                )}
                <button
                  onClick={() => setCallNotification(null)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer'
                  }}
                >
                  Later
                </button>
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
            {sessionStatus === 'pending' && chatMessages.length === 1 && (
              <div style={{
                textAlign: 'center',
                padding: '2rem',
                background: '#fef3c7',
                borderRadius: '0.5rem',
                border: '1px solid #fbbf24'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
                <div style={{
                  color: '#92400e',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  fontSize: '1.1rem'
                }}>
                  Your message has been sent!
                </div>
                <div style={{
                  color: '#78350f',
                  fontSize: '0.875rem',
                  lineHeight: '1.5'
                }}>
                  A counselor will respond soon. You can start typing your next message below or wait for their response.
                </div>
              </div>
            )}

            {chatMessages.length === 0 ? (
              <div style={{
                textAlign: 'center',
                color: '#6b7280',
                fontSize: '0.875rem',
                marginTop: '2rem'
              }}>
                Start the conversation by typing your message below...
              </div>
            ) : (
              chatMessages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{
                    maxWidth: '70%',
                    padding: '0.75rem 1rem',
                    borderRadius: '1rem',
                    background: msg.sender === 'user' ? '#3b82f6' : '#f3f4f6',
                    color: msg.sender === 'user' ? 'white' : '#374151',
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
                      {new Date(msg.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {sessionStatus !== 'completed' && (
            <div style={{
              padding: '1rem 2rem',
              background: '#f0fdf4',
              borderTop: '1px solid #bbf7d0',
              borderBottom: '1px solid #bbf7d0'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                <div>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#166534',
                    marginBottom: '0.25rem'
                  }}>
                    💚 Support Our Service
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#15803d',
                    lineHeight: '1.4'
                  }}>
                    Found this helpful? Support us with any amount you feel comfortable with.
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <button
                    onClick={() => {
                      setShowChat(false)
                      setShowPayment(true)
                    }}
                    style={{
                      padding: '0.75rem 1rem',
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)'
                    }}
                  >
                    💳 Make Payment
                  </button>
                  
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    textAlign: 'center'
                  }}>
                    Pay what you<br/>feel it's worth
                  </div>
                </div>
              </div>
            </div>
          )}

          {sessionStatus !== 'completed' && (
            <div style={{
              padding: '1rem 2rem',
              borderTop: '1px solid #e5e7eb',
              background: 'white'
            }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <textarea
                  value={newChatMessage}
                  onChange={(e) => setNewChatMessage(e.target.value)}
                  onKeyPress={handleChatKeyPress}
                  placeholder={sessionStatus === 'pending' ? "Continue the conversation..." : "Type your message..."}
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
                  onClick={sendChatMessage}
                  disabled={!newChatMessage.trim()}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: !newChatMessage.trim() ? '#d1d5db' : '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: !newChatMessage.trim() ? 'not-allowed' : 'pointer',
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
                Press Enter to send • Shift+Enter for new line • You can make a payment anytime using the button above
              </div>
            </div>
          )}

          {sessionStatus === 'completed' && (
            <div style={{
              padding: '1rem 2rem',
              background: '#fef3c7',
              borderTop: '1px solid #fbbf24',
              textAlign: 'center'
            }}>
              <div style={{ color: '#92400e', fontWeight: '600', marginBottom: '0.5rem' }}>
                Session Completed
              </div>
              <div style={{ color: '#78350f', fontSize: '0.875rem' }}>
                You should see the payment page shortly.
              </div>
              <button
                onClick={() => {
                  setShowPayment(true)
                  setShowChat(false)
                }}
                style={{
                  marginTop: '0.5rem',
                  padding: '0.5rem 1rem',
                  background: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                Go to Payment
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Initial message submission form
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        padding: '3rem',
        maxWidth: '600px',
        width: '100%'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 1rem 0', color: '#1f2937' }}>
            Share Your Feelings
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
            Hello {user?.name}, share what's on your mind and get personalized support from a caring counselor.
          </p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            What's on your mind? *
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            placeholder="Share your thoughts, feelings, or what you're going through..."
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              resize: 'vertical',
              minHeight: '120px'
            }}
          />
          <div style={{
            fontSize: '0.75rem',
            color: '#6b7280',
            marginTop: '0.5rem',
            textAlign: 'right'
          }}>
            {message.length} characters
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!message.trim()}
          style={{
            width: '100%',
            padding: '1rem',
            background: !message.trim() ? '#d1d5db' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: !message.trim() ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Share My Feelings
        </button>

        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#f9fafb',
          borderRadius: '0.5rem',
          textAlign: 'center',
          fontSize: '0.875rem',
          color: '#6b7280'
        }}>
          <p style={{ margin: '0 0 0.5rem 0' }}>Your privacy is important to us. All conversations are confidential.</p>
          <p style={{ margin: 0 }}>Secure personal sessions • Chat & video call support • Pay what you feel it's worth</p>
        </div>
      </div>
    </div>
  )
}

export default SimplifiedUserInterface