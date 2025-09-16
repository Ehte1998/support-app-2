import { createContext, useContext, useState, useEffect } from 'react'

const UserAuthContext = createContext()

export const useUserAuth = () => {
  const context = useContext(UserAuthContext)
  if (!context) {
    throw new Error('useUserAuth must be used within a UserAuthProvider')
  }
  return context
}

export const UserAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if (token) {
      validateToken(token)
    } else {
      setLoading(false)
    }
  }, [])

  const validateToken = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/validate-user', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const userData = await response.json()
        setCurrentUser(userData)
      } else {
        localStorage.removeItem('userToken')
      }
    } catch (error) {
      console.error('Token validation error:', error)
      localStorage.removeItem('userToken')
    } finally {
      setLoading(false)
    }
  }

  const register = async (email, password, name, isAnonymous = false) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name, isAnonymous })
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('userToken', data.token)
        setCurrentUser(data.user)
        return { success: true, user: data.user }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, error: 'Registration failed. Please try again.' }
    }
  }

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/user-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('userToken', data.token)
        setCurrentUser(data.user)
        return { success: true, user: data.user }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Login failed. Please try again.' }
    }
  }

  const logout = () => {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userMessageId')
    localStorage.removeItem('userName')
    localStorage.removeItem('submissionTime')
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    loading,
    register,
    login,
    logout
  }

  return (
    <UserAuthContext.Provider value={value}>
      {!loading && children}
    </UserAuthContext.Provider>
  )
}