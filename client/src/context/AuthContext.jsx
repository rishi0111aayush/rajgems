import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('raj-gems-token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      // Verify token with server
      axios.get('/api/auth/verify')
        .then(res => setAdmin(res.data.admin))
        .catch(() => {
          localStorage.removeItem('raj-gems-token')
          delete axios.defaults.headers.common['Authorization']
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (username, password) => {
    const res = await axios.post('/api/auth/login', { username, password })
    const { token, admin } = res.data
    localStorage.setItem('raj-gems-token', token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setAdmin(admin)
    return admin
  }

  const logout = () => {
    localStorage.removeItem('raj-gems-token')
    delete axios.defaults.headers.common['Authorization']
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
