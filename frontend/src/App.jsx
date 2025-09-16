// App.jsx - Updated to support both admin and user authentication
import { useState, useEffect } from 'react'
import AdminDashboard from './AdminDashboard'
import LoginForm from './LoginForm'
import { AuthProvider, useAuth } from './AuthContext' // Existing admin auth
import { UserAuthProvider } from './UserAuthContext' // New user auth
import AuthenticatedUserInterface from './AuthenticatedUserInterface'
import './index.css'

// Protected Admin Component (uses existing AuthContext)
function ProtectedAdminDashboard() {
  const { currentUser, logout } = useAuth() // This uses admin AuthContext

  if (!currentUser) {
    return <LoginForm />
  }

  return (
    <div>
      <AdminDashboard user={currentUser} onLogout={logout} />
    </div>
  )
}

// Check URL parameters for routing
const urlParams = new URLSearchParams(window.location.search)
const isAdminMode = urlParams.has('admin')

// Main App Component with Authentication
function AppContent() {
  // Handle admin dashboard routing
  if (isAdminMode) {
    return (
      <AuthProvider>
        <ProtectedAdminDashboard />
      </AuthProvider>
    )
  }

  // Default to user interface with user authentication
  return (
    <UserAuthProvider>
      <AuthenticatedUserInterface />
    </UserAuthProvider>
  )
}

function App() {
  return <AppContent />
}

export default App