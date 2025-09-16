import { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import Peer from 'simple-peer'

function CallInterface({ messageId, isAdmin, onCallEnd }) {
  const [socket, setSocket] = useState(null)
  const [stream, setStream] = useState(null)
  const [callAccepted, setCallAccepted] = useState(false)
  const [callEnded, setCallEnded] = useState(false)
  const [incomingCall, setIncomingCall] = useState(null)
  const [mediaReady, setMediaReady] = useState(false)
  const [audioOnly, setAudioOnly] = useState(false)
  const [muted, setMuted] = useState(false)
  const [videoOff, setVideoOff] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [error, setError] = useState(null)

  const myVideo = useRef()
  const userVideo = useRef()
  const connectionRef = useRef()

  // Initialize socket connection and media
  useEffect(() => {
    const newSocket = io('http://localhost:5000')
    setSocket(newSocket)

    // Join appropriate room
    if (isAdmin) {
      newSocket.emit('join-admin')
    } else {
      newSocket.emit('join-message-room', messageId)
    }

    // Set up media
    const setupMedia = async () => {
      try {
        const currentStream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        })
        setStream(currentStream)
        setMediaReady(true)
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream
        }
      } catch (error) {
        console.warn('Video access denied, trying audio only:', error)
        try {
          const audioStream = await navigator.mediaDevices.getUserMedia({ 
            video: false, 
            audio: true 
          })
          setStream(audioStream)
          setAudioOnly(true)
          setMediaReady(true)
        } catch (audioError) {
          console.error('Media access denied:', audioError)
          setError('Camera and microphone access required for video calls')
        }
      }
    }

    setupMedia()

    // Listen for incoming calls (for users)
    newSocket.on('incoming-call', (data) => {
      setIncomingCall(data)
      setConnecting(true)
    })

    // Listen for call acceptance
    newSocket.on('call-accepted', (data) => {
      setCallAccepted(true)
      setConnecting(false)
      if (connectionRef.current) {
        connectionRef.current.signal(data.signal)
      }
    })

    // Listen for call rejection
    newSocket.on('call-rejected', () => {
      setError('Call was rejected by the other party')
      setConnecting(false)
      setTimeout(() => {
        endCall()
      }, 3000)
    })

    // Listen for call end
    newSocket.on('call-ended', () => {
      endCall()
    })

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
      newSocket.close()
    }
  }, [messageId, isAdmin])

  // Start a call (admin initiates)
  const startCall = () => {
    if (!stream || !mediaReady) {
      setError('Please wait for media to initialize')
      return
    }

    setConnecting(true)
    
    const peer = new Peer({ initiator: true, trickle: false, stream: stream })

    peer.on('signal', (data) => {
      socket.emit('initiate-call', {
        signal: data,
        messageId: messageId,
        callerType: isAdmin ? 'admin' : 'user'
      })
    })

    peer.on('stream', (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream
      }
    })

    peer.on('error', (err) => {
      console.error('Peer connection error:', err)
      setError('Connection failed. Please try again.')
      setConnecting(false)
    })

    connectionRef.current = peer
  }

  // Accept incoming call (user accepts)
  const acceptCall = () => {
    if (!stream || !mediaReady) {
      setError('Please wait for media to initialize')
      return
    }

    setCallAccepted(true)
    setConnecting(false)

    const peer = new Peer({ initiator: false, trickle: false, stream: stream })

    peer.on('signal', (data) => {
      socket.emit('accept-call', {
        signal: data,
        to: incomingCall.from,
        messageId: messageId
      })
    })

    peer.on('stream', (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream
      }
    })

    peer.on('error', (err) => {
      console.error('Peer connection error:', err)
      setError('Connection failed. Please try again.')
    })

    peer.signal(incomingCall.signal)
    connectionRef.current = peer
    setIncomingCall(null)
  }

  // Reject incoming call
  const rejectCall = () => {
    socket.emit('reject-call', {
      to: incomingCall.from,
      messageId: messageId
    })
    setIncomingCall(null)
    endCall()
  }

  // End call
  const endCall = () => {
    setCallEnded(true)
    
    if (socket) {
      socket.emit('end-call', { messageId: messageId })
    }

    if (connectionRef.current) {
      connectionRef.current.destroy()
    }

    if (stream) {
      stream.getTracks().forEach(track => track.stop())
    }

    setTimeout(() => {
      onCallEnd()
    }, 1000)
  }

  // Toggle mute
  const toggleMute = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled
      })
      setMuted(!muted)
    }
  }

  // Toggle video
  const toggleVideo = () => {
    if (stream && !audioOnly) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled
      })
      setVideoOff(!videoOff)
    }
  }

  // If call ended
  if (callEnded) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            background: '#374151',
            borderRadius: '50%',
            width: '80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto'
          }}>
            📞
          </div>
          <h2 style={{ marginBottom: '1rem' }}>Call Ended</h2>
          <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
            Thank you for using our counseling service
          </p>
          <div style={{
            background: '#374151',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            color: '#9ca3af'
          }}>
            Closing in a moment...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
      display: 'flex',
      flexDirection: 'column',
      color: 'white'
    }}>
      {/* Header */}
      <div style={{
        padding: '1rem 2rem',
        background: 'rgba(0, 0, 0, 0.3)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.25rem' }}>
            {isAdmin ? 'Counselor Session' : 'Support Call'}
          </h2>
          <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.25rem' }}>
            {connecting ? 'Connecting...' : 
             callAccepted ? 'Connected' : 
             incomingCall ? 'Incoming call' : 'Ready to connect'}
          </div>
        </div>
        <button
          onClick={endCall}
          style={{
            padding: '0.5rem 1rem',
            background: '#dc2626',
            border: 'none',
            borderRadius: '0.5rem',
            color: 'white',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}
        >
          End Call
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div style={{
          padding: '1rem',
          background: '#dc2626',
          color: 'white',
          textAlign: 'center',
          fontSize: '0.875rem'
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Incoming Call Alert */}
      {incomingCall && !isAdmin && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0, 0, 0, 0.9)',
          padding: '2rem',
          borderRadius: '1rem',
          textAlign: 'center',
          zIndex: 1000,
          minWidth: '300px'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📞</div>
          <h3 style={{ marginBottom: '1rem' }}>Incoming Call</h3>
          <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
            Counselor wants to start a session
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={acceptCall}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#10b981',
                border: 'none',
                borderRadius: '0.5rem',
                color: 'white',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Accept
            </button>
            <button
              onClick={rejectCall}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#dc2626',
                border: 'none',
                borderRadius: '0.5rem',
                color: 'white',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Decline
            </button>
          </div>
        </div>
      )}

      {/* Video Area */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem',
        gap: '2rem'
      }}>
        {/* Waiting State */}
        {!callAccepted && !incomingCall && (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '1rem',
              padding: '3rem',
              marginBottom: '2rem'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                {mediaReady ? '📹' : '⏳'}
              </div>
              <h3 style={{ marginBottom: '1rem' }}>
                {mediaReady ? 'Ready for Call' : 'Setting up camera...'}
              </h3>
              <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
                {isAdmin ? 
                  'Click "Start Call" to connect with the user' :
                  'Waiting for counselor to start the session'
                }
              </p>
              {isAdmin && mediaReady && (
                <button
                  onClick={startCall}
                  disabled={connecting}
                  style={{
                    padding: '1rem 2rem',
                    background: connecting ? '#6b7280' : '#10b981',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: 'white',
                    cursor: connecting ? 'not-allowed' : 'pointer',
                    fontSize: '1rem',
                    fontWeight: '500'
                  }}
                >
                  {connecting ? 'Calling...' : 'Start Call'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Active Call */}
        {(callAccepted || (isAdmin && connecting)) && (
          <div style={{ display: 'flex', gap: '2rem', width: '100%', justifyContent: 'center' }}>
            {/* My Video */}
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ marginBottom: '1rem' }}>
                {isAdmin ? 'You (Counselor)' : 'You'}
              </h3>
              {audioOnly || videoOff ? (
                <div style={{
                  width: '400px',
                  height: '300px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem'
                }}>
                  {muted ? '🔇' : '🎤'}
                </div>
              ) : (
                <video
                  ref={myVideo}
                  muted
                  autoPlay
                  style={{
                    width: '400px',
                    height: '300px',
                    borderRadius: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    objectFit: 'cover'
                  }}
                />
              )}
            </div>

            {/* Other Person's Video */}
            {callAccepted && (
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ marginBottom: '1rem' }}>
                  {isAdmin ? 'User' : 'Counselor'}
                </h3>
                <video
                  ref={userVideo}
                  autoPlay
                  style={{
                    width: '400px',
                    height: '300px',
                    borderRadius: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    objectFit: 'cover'
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Controls */}
      {(callAccepted || (isAdmin && connecting)) && (
        <div style={{
          padding: '2rem',
          background: 'rgba(0, 0, 0, 0.3)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem'
        }}>
          <button
            onClick={toggleMute}
            style={{
              padding: '1rem',
              background: muted ? '#dc2626' : 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '50%',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1.25rem',
              width: '60px',
              height: '60px'
            }}
          >
            {muted ? '🔇' : '🎤'}
          </button>
          
          {!audioOnly && (
            <button
              onClick={toggleVideo}
              style={{
                padding: '1rem',
                background: videoOff ? '#dc2626' : 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '50%',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1.25rem',
                width: '60px',
                height: '60px'
              }}
            >
              {videoOff ? '📹' : '📷'}
            </button>
          )}
          
          <button
            onClick={endCall}
            style={{
              padding: '1rem',
              background: '#dc2626',
              border: 'none',
              borderRadius: '50%',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1.25rem',
              width: '60px',
              height: '60px'
            }}
          >
            📞
          </button>
        </div>
      )}
    </div>
  )
}

export default CallInterface