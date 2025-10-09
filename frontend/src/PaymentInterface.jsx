import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function PaymentInterface({ messageId, onPaymentComplete, onSkip }) {
  const [customAmount, setCustomAmount] = useState('')
  const [selectedAmount, setSelectedAmount] = useState(2000)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi') // DEFAULT SET HERE
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const predefinedAmounts = [500, 1000, 2000, 5000, 10000]

  // Debug: Log state changes
  useEffect(() => {
    console.log('🔍 Payment Method Selected:', selectedPaymentMethod)
  }, [selectedPaymentMethod])

  useEffect(() => {
    console.log('🔍 Customer Details:', customerDetails)
  }, [customerDetails])

  const initiatePayment = async (amount) => {
    setLoading(true)
    setMessage('')

    // DEBUG LOGS
    console.log('=== PAYMENT DEBUG START ===')
    console.log('📤 Sending to API:', {
      amount: amount,
      messageId: messageId,
      paymentMethod: selectedPaymentMethod,
      customerDetails: customerDetails
    })
    console.log('🌐 API URL:', API_URL)
    console.log('=== PAYMENT DEBUG END ===')

    try {
      // Validate payment method
      if (!selectedPaymentMethod) {
        setMessage('❌ Please select a payment method')
        setLoading(false)
        return
      }

      // Validate customer details for UPI/GPay
      if ((selectedPaymentMethod === 'upi' || selectedPaymentMethod === 'gpay') && 
          (!customerDetails.name || !customerDetails.email || !customerDetails.phone)) {
        setMessage('❌ Please fill in all customer details for UPI/GPay payment')
        setLoading(false)
        return
      }

      // Create payment order
      const requestBody = {
        amount: amount,
        messageId: messageId,
        paymentMethod: selectedPaymentMethod,
        customerDetails: selectedPaymentMethod === 'paypal' ? {} : customerDetails
      }

      console.log('📡 Making API request...')
      console.log('Request Body:', JSON.stringify(requestBody, null, 2))

      const orderResponse = await fetch(`${API_URL}/api/create-payment-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      console.log('📥 Response Status:', orderResponse.status)
      console.log('📥 Response OK:', orderResponse.ok)

      const responseText = await orderResponse.text()
      console.log('📥 Raw Response:', responseText)

      let orderData
      try {
        orderData = JSON.parse(responseText)
        console.log('📥 Parsed Response:', orderData)
      } catch (e) {
        console.error('❌ JSON Parse Error:', e)
        throw new Error('Invalid response from server')
      }

      if (!orderData.success) {
        console.error('❌ API Error:', orderData.error)
        throw new Error(orderData.error || 'Failed to create payment order')
      }

      console.log('✅ Payment order created successfully')

      // Handle PayPal Payment
      if (selectedPaymentMethod === 'paypal') {
        if (orderData.approvalUrl) {
          console.log('🔗 Redirecting to PayPal:', orderData.approvalUrl)
          window.location.href = orderData.approvalUrl
        } else {
          throw new Error('PayPal approval URL not found')
        }
      }
      
      // Handle UPI/GPay Payment
      else if (selectedPaymentMethod === 'upi' || selectedPaymentMethod === 'gpay') {
        if (orderData.paymentLink) {
          console.log('🔗 Redirecting to Cashfree:', orderData.paymentLink)
          window.location.href = orderData.paymentLink
        } else {
          throw new Error('Payment link not found')
        }
      }

    } catch (error) {
      console.error('💥 Payment Error:', error)
      console.error('💥 Error Stack:', error.stack)
      setMessage(`❌ ${error.message || 'Payment failed. Please try again.'}`)
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
    
    console.log('🎯 Payment Button Clicked')
    console.log('Amount:', amount)
    console.log('Payment Method:', selectedPaymentMethod)
    
    if (!amount || amount < 1) {
      setMessage('❌ Please enter a valid amount')
      return
    }

    if (amount > 100000) {
      setMessage('❌ Maximum amount is ₹1,00,000')
      return
    }

    initiatePayment(amount)
  }

  const currentAmount = customAmount ? parseInt(customAmount) : selectedAmount

  const paymentMethods = [
    { 
      id: 'upi', 
      name: 'UPI', 
      icon: '💳', 
      color: '#5f259f',
      description: 'Pay via any UPI app',
      badge: 'Instant'
    },
    { 
      id: 'gpay', 
      name: 'Google Pay', 
      icon: '🟢', 
      color: '#1a73e8',
      description: 'Google Pay / PhonePe / Paytm',
      badge: 'Popular'
    },
    { 
      id: 'paypal', 
      name: 'PayPal', 
      icon: '💙', 
      color: '#0070ba',
      description: 'International payments',
      badge: 'Global'
    }
  ]

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
        width: '100%',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Debug Info */}
        <div style={{
          background: '#f3f4f6',
          border: '1px solid #d1d5db',
          borderRadius: '0.5rem',
          padding: '1rem',
          marginBottom: '1.5rem',
          fontSize: '0.75rem',
          fontFamily: 'monospace'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>🐛 DEBUG INFO:</div>
          <div>Selected Method: <strong>{selectedPaymentMethod || 'NONE'}</strong></div>
          <div>Amount: ₹{currentAmount || 0}</div>
          <div>Message ID: {messageId || 'NONE'}</div>
          <div>API URL: {API_URL}</div>
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: '0 0 0.5rem 0'
          }}>
            Support Our Platform
          </h2>
          <p style={{
            color: '#6b7280',
            fontSize: '1rem',
            margin: 0
          }}>
            Your contribution helps keep peer support running
          </p>
        </div>

        {/* Message Display */}
        {message && (
          <div style={{
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
            textAlign: 'center',
            background: message.includes('✅') ? '#dcfce7' : '#fef2f2',
            color: message.includes('✅') ? '#166534' : '#991b1b',
            border: `1px solid ${message.includes('✅') ? '#bbf7d0' : '#fecaca'}`
          }}>
            {message}
          </div>
        )}

        {/* Payment Method Selection */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '1rem'
          }}>
            1️⃣ Choose Payment Method:
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => {
                  console.log('🎯 Payment method changed to:', method.id)
                  setSelectedPaymentMethod(method.id)
                }}
                disabled={loading}
                style={{
                  padding: '1rem',
                  border: selectedPaymentMethod === method.id ? `3px solid ${method.color}` : '2px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  background: selectedPaymentMethod === method.id ? `${method.color}15` : 'white',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  textAlign: 'center',
                  position: 'relative',
                  transition: 'all 0.2s',
                  transform: selectedPaymentMethod === method.id ? 'scale(1.02)' : 'scale(1)'
                }}
              >
                {method.badge && (
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: method.color,
                    color: 'white',
                    fontSize: '0.65rem',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '1rem',
                    fontWeight: '600'
                  }}>
                    {method.badge}
                  </div>
                )}
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{method.icon}</div>
                <div style={{
                  fontWeight: '600',
                  color: selectedPaymentMethod === method.id ? method.color : '#374151',
                  marginBottom: '0.25rem',
                  fontSize: '0.9rem'
                }}>
                  {method.name}
                </div>
                <div style={{
                  fontSize: '0.7rem',
                  color: '#6b7280',
                  lineHeight: '1.2'
                }}>
                  {method.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Customer Details for UPI/GPay */}
        {(selectedPaymentMethod === 'upi' || selectedPaymentMethod === 'gpay') && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '1rem'
            }}>
              2️⃣ Your Details:
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input
                type="text"
                value={customerDetails.name}
                onChange={(e) => setCustomerDetails(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Full Name *"
                required
                style={{
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem'
                }}
              />
              <input
                type="email"
                value={customerDetails.email}
                onChange={(e) => setCustomerDetails(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Email Address *"
                required
                style={{
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem'
                }}
              />
              <input
                type="tel"
                value={customerDetails.phone}
                onChange={(e) => setCustomerDetails(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Phone Number (10 digits) *"
                required
                maxLength="10"
                pattern="[0-9]{10}"
                style={{
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem'
                }}
              />
            </div>
          </div>
        )}

        {/* Amount Selection */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '1rem'
          }}>
            {(selectedPaymentMethod === 'upi' || selectedPaymentMethod === 'gpay') ? '3️⃣' : '2️⃣'} Choose Amount:
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
                disabled={loading}
                style={{
                  padding: '1rem 0.5rem',
                  border: selectedAmount === amount ? '2px solid #3b82f6' : '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  background: selectedAmount === amount ? '#eff6ff' : 'white',
                  color: selectedAmount === amount ? '#1d4ed8' : '#374151',
                  cursor: loading ? 'not-allowed' : 'pointer',
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
              Or enter custom amount:
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
                disabled={loading}
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

        {/* Action Buttons */}
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
              transition: 'all 0.2s'
            }}
          >
            {loading ? 'Processing...' : `💳 Pay ₹${currentAmount || 0} via ${
              selectedPaymentMethod === 'paypal' ? 'PayPal' :
              selectedPaymentMethod === 'gpay' ? 'GPay' : 'UPI'
            }`}
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
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            Skip Payment
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentInterface