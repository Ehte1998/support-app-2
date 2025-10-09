import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Payment Success Page
export function PaymentSuccess() {
  const [verifying, setVerifying] = useState(true)
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState('')
  const [paymentDetails, setPaymentDetails] = useState(null)

  useEffect(() => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token') // PayPal token
    const PayerID = urlParams.get('PayerID') // PayPal payer ID
    const orderId = urlParams.get('orderId') // Cashfree order ID
    const amount = urlParams.get('orderAmount') || urlParams.get('amount')
    const messageId = urlParams.get('messageId')
    
    if (token && PayerID) {
      // PayPal payment - capture it
      verifyPayPalPayment(token, messageId)
    } else if (orderId) {
      // Cashfree payment - verify it
      verifyCashfreePayment(orderId, amount, messageId)
    } else {
      setError('Invalid payment parameters')
      setVerifying(false)
    }
  }, [])

  const verifyPayPalPayment = async (orderId, messageId) => {
    try {
      const response = await fetch(`${API_URL}/api/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          paymentMethod: 'paypal',
          orderId: orderId,
          messageId: messageId
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setVerified(true)
        setPaymentDetails({
          method: 'PayPal',
          transactionId: data.captureId
        })
      } else {
        setError(data.error || 'Payment verification failed')
      }
    } catch (error) {
      console.error('Verification error:', error)
      setError('Failed to verify payment')
    } finally {
      setVerifying(false)
    }
  }

  const verifyCashfreePayment = async (orderId, amount, messageId) => {
    try {
      const response = await fetch(`${API_URL}/api/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          paymentMethod: 'upi', // or 'gpay'
          orderId: orderId,
          messageId: messageId,
          amount: amount
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setVerified(true)
        setPaymentDetails({
          method: 'UPI/GPay',
          transactionId: data.transactionId,
          amount: amount
        })
      } else {
        setError(data.error || 'Payment verification failed')
      }
    } catch (error) {
      console.error('Verification error:', error)
      setError('Failed to verify payment')
    } finally {
      setVerifying(false)
    }
  }

  const goToHome = () => {
    window.location.href = '/'
  }

  if (verifying) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '3rem',
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center'
        }}>
          <div className="loading-spinner" style={{
            width: '60px',
            height: '60px',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            margin: '0 auto 2rem',
            animation: 'spin 1s linear infinite'
          }} />
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '1rem'
          }}>
            Verifying Your Payment...
          </h2>
          <p style={{
            color: '#6b7280',
            fontSize: '1rem'
          }}>
            Please wait while we confirm your transaction
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '3rem',
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: '#fef2f2',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
            fontSize: '2.5rem'
          }}>
            ❌
          </div>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 'bold',
            color: '#dc2626',
            marginBottom: '1rem'
          }}>
            Payment Verification Failed
          </h2>
          <p style={{
            color: '#6b7280',
            fontSize: '1rem',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            {error}
          </p>
          <div style={{
            background: '#fef3c7',
            border: '1px solid #fbbf24',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginBottom: '2rem',
            textAlign: 'left'
          }}>
            <p style={{
              color: '#92400e',
              fontSize: '0.875rem',
              margin: 0,
              lineHeight: '1.5'
            }}>
              <strong>Don't worry!</strong> If the payment was deducted from your account, 
              it will be automatically refunded within 5-7 business days. 
              You can also contact our support for assistance.
            </p>
          </div>
          <button
            onClick={goToHome}
            style={{
              padding: '1rem 2rem',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Return to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        padding: '3rem',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          fontSize: '2.5rem',
          animation: 'scaleIn 0.5s ease-out'
        }}>
          ✅
        </div>
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '1rem'
        }}>
          Payment Successful!
        </h2>
        <p style={{
          color: '#6b7280',
          fontSize: '1rem',
          lineHeight: '1.6',
          marginBottom: '2rem'
        }}>
          Thank you for your contribution! Your support helps us continue providing 
          peer support to those in need.
        </p>
        
        {paymentDetails && (
          <div style={{
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginBottom: '1.5rem',
            textAlign: 'left'
          }}>
            <div style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              marginBottom: '0.5rem'
            }}>
              Payment Details:
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}>
              <span style={{ color: '#374151', fontSize: '0.875rem' }}>Method:</span>
              <span style={{ color: '#1f2937', fontSize: '0.875rem', fontWeight: '500' }}>
                {paymentDetails.method}
              </span>
            </div>
            {paymentDetails.amount && (
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem'
              }}>
                <span style={{ color: '#374151', fontSize: '0.875rem' }}>Amount:</span>
                <span style={{ color: '#1f2937', fontSize: '0.875rem', fontWeight: '500' }}>
                  ₹{paymentDetails.amount}
                </span>
              </div>
            )}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span style={{ color: '#374151', fontSize: '0.875rem' }}>Transaction ID:</span>
              <span style={{ 
                color: '#1f2937', 
                fontSize: '0.75rem', 
                fontFamily: 'monospace',
                wordBreak: 'break-all'
              }}>
                {paymentDetails.transactionId}
              </span>
            </div>
          </div>
        )}

        <div style={{
          background: '#dcfce7',
          border: '1px solid #bbf7d0',
          borderRadius: '0.5rem',
          padding: '1rem',
          marginBottom: '2rem'
        }}>
          <p style={{
            color: '#166534',
            fontSize: '0.875rem',
            margin: 0,
            lineHeight: '1.5'
          }}>
            Your payment has been confirmed and recorded. You can close this window 
            or start a new conversation.
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <button
            onClick={goToHome}
            style={{
              padding: '1rem 2rem',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Start New Conversation
          </button>
          
          <a
            href="/?contact"
            style={{
              padding: '0.75rem 1.5rem',
              background: 'transparent',
              color: '#6b7280',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              textDecoration: 'none',
              display: 'block',
              textAlign: 'center'
            }}
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}

// Payment Failure/Cancel Page
export function PaymentFailed() {
  const goToHome = () => {
    window.location.href = '/'
  }

  const tryAgain = () => {
    window.history.back()
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        padding: '3rem',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: '#fef3c7',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          fontSize: '2.5rem'
        }}>
          ⚠️
        </div>
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '1rem'
        }}>
          Payment Not Completed
        </h2>
        <p style={{
          color: '#6b7280',
          fontSize: '1rem',
          lineHeight: '1.6',
          marginBottom: '2rem'
        }}>
          Your payment was cancelled or could not be processed. Don't worry, 
          you can try again or continue using our platform without payment.
        </p>

        <div style={{
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '0.5rem',
          padding: '1rem',
          marginBottom: '2rem',
          textAlign: 'left'
        }}>
          <div style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#166534',
            marginBottom: '0.5rem'
          }}>
            Remember: Payment is Optional
          </div>
          <p style={{
            color: '#15803d',
            fontSize: '0.875rem',
            margin: 0,
            lineHeight: '1.5'
          }}>
            Our peer support platform is available to everyone regardless of ability to pay. 
            Contributions help us keep the service running for others.
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <button
            onClick={tryAgain}
            style={{
              padding: '1rem 2rem',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
          
          <button
            onClick={goToHome}
            style={{
              padding: '1rem 2rem',
              background: 'transparent',
              color: '#6b7280',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Return to Home
          </button>

          <a
            href="/?contact"
            style={{
              padding: '0.75rem 1.5rem',
              color: '#6b7280',
              fontSize: '0.875rem',
              textDecoration: 'underline',
              textAlign: 'center'
            }}
          >
            Need help? Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}