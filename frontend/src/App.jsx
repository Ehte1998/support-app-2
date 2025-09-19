// App.jsx - Updated with all pages including legal documents
import { useState, useEffect } from 'react'
import AdminDashboard from './AdminDashboard'
import LoginForm from './LoginForm'
import AboutUs from './AboutUs'
import PricingDetails from './PricingDetails'
import { TermsAndConditions, PrivacyPolicy, RefundPolicy, ContactUs } from './LegalPages'
import { AuthProvider, useAuth } from './AuthContext'
import { UserAuthProvider } from './UserAuthContext'
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

// Navigation Component for easy access to different pages
function Navigation({ currentPage }) {
  const navStyle = {
    position: 'fixed',
    top: '1rem',
    left: '50%',
    transform: 'translateX(-50%)', // Center horizontally
    display: 'flex',
    gap: '0.5rem',
    zIndex: 1000,
    background: 'rgba(0, 0, 0, 0.3)',
    padding: '0.5rem 1rem',
    borderRadius: '2rem',
    backdropFilter: 'blur(10px)'
  }

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: '500',
    padding: '0.5rem 1rem',
    borderRadius: '1rem',
    transition: 'background 0.2s'
  }

  const activeLinkStyle = {
    ...linkStyle,
    background: 'rgba(255, 255, 255, 0.2)'
  }

  // Don't show navigation on admin pages
  if (currentPage === 'admin') {
    return null
  }

  return (
    <nav style={navStyle}>
      <a 
        href="/" 
        style={currentPage === 'home' ? activeLinkStyle : linkStyle}
      >
        Home
      </a>
      <a 
        href="/?about" 
        style={currentPage === 'about' ? activeLinkStyle : linkStyle}
      >
        About
      </a>
      <a 
        href="/?pricing" 
        style={currentPage === 'pricing' ? activeLinkStyle : linkStyle}
      >
        Pricing
      </a>
      <a 
        href="/?contact" 
        style={currentPage === 'contact' ? activeLinkStyle : linkStyle}
      >
        Contact
      </a>
    </nav>
  )
}

// Check URL parameters for routing
const urlParams = new URLSearchParams(window.location.search)
const isAdminMode = urlParams.has('admin')
const isAboutPage = urlParams.has('about')
const isPricingPage = urlParams.has('pricing')
const isContactPage = urlParams.has('contact')
const isTermsPage = urlParams.has('terms')
const isPrivacyPage = urlParams.has('privacy')
const isRefundPage = urlParams.has('refund')

// Main App Component with Authentication
function AppContent() {
  // Determine current page for navigation
  const currentPage = isAdminMode ? 'admin' : 
                     isAboutPage ? 'about' : 
                     isPricingPage ? 'pricing' :
                     isContactPage ? 'contact' : 'home'

  // Handle admin dashboard routing
  if (isAdminMode) {
    return (
      <AuthProvider>
        <Navigation currentPage={currentPage} />
        <ProtectedAdminDashboard />
      </AuthProvider>
    )
  }

  // Handle About Us page
  if (isAboutPage) {
    return (
      <div>
        <Navigation currentPage={currentPage} />
        <AboutUs />
      </div>
    )
  }

  // Handle Pricing page
  if (isPricingPage) {
    return (
      <div>
        <Navigation currentPage={currentPage} />
        <PricingDetails />
      </div>
    )
  }

  // Handle Contact page
  if (isContactPage) {
    return (
      <div>
        <Navigation currentPage={currentPage} />
        <ContactUs />
      </div>
    )
  }

  // Handle Terms page
  if (isTermsPage) {
    return (
      <div>
        <Navigation currentPage="legal" />
        <TermsAndConditions />
      </div>
    )
  }

  // Handle Privacy page
  if (isPrivacyPage) {
    return (
      <div>
        <Navigation currentPage="legal" />
        <PrivacyPolicy />
      </div>
    )
  }

  // Handle Refund page
  if (isRefundPage) {
    return (
      <div>
        <Navigation currentPage="legal" />
        <RefundPolicy />
      </div>
    )
  }

  // Default to user interface with user authentication
  return (
    <UserAuthProvider>
      <Navigation currentPage={currentPage} />
      <AuthenticatedUserInterface />
    </UserAuthProvider>
  )
}

function App() {
  return <AppContent />
}

export default App