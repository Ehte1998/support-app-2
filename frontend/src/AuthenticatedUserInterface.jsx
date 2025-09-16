import { useState } from 'react'
import { useUserAuth } from './UserAuthContext'
import UserLoginForm from './UserLoginForm'
import UserRegisterForm from './UserRegisterForm'
import SimplifiedUserInterface from './UserChat' // Your existing chat component

function AuthenticatedUserInterface() {
  const [showRegister, setShowRegister] = useState(false)
  const { currentUser, logout } = useUserAuth()

  if (!currentUser) {
    if (showRegister) {
      return <UserRegisterForm onSwitchToLogin={() => setShowRegister(false)} />
    }
    return <UserLoginForm onSwitchToRegister={() => setShowRegister(true)} />
  }

  return (
    <div>
      {/* User header with logout */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        padding: '1rem',
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '0 0 0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Welcome, {currentUser.name}
          </span>
          <button
            onClick={logout}
            style={{
              padding: '0.5rem 1rem',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '0.75rem'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Pass user info to the chat component */}
      <SimplifiedUserInterface user={currentUser} />
    </div>
  )
}

export default AuthenticatedUserInterface