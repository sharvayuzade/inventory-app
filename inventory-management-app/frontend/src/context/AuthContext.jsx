import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setInitializing(false)
      return
    }
    // try to fetch user info
    const load = async () => {
      try {
        const res = await api.get('/auth/me')
        setUser(res.data.user || null)
      } catch (err) {
        console.error('Auth fetch failed', err)
        setUser(null)
      } finally {
        setInitializing(false)
      }
    }
    load()
  }, [])

  const login = async (data) => {
    // store token first so subsequent requests include it
    localStorage.setItem('token', data.token)
    // try fetching full user profile from server
    try {
      const res = await api.get('/auth/me')
      setUser(res.data.user || null)
    } catch (err) {
      console.error('Failed to load user after login', err)
      setUser(null)
    }
  }
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, initializing }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
