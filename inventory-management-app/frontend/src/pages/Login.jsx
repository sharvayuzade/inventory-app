import React, { useState } from 'react'
import api from '../services/api'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import '../styles/auth.css'

export default function Login(){
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/login', form)
      if (res.data?.token) {
        login(res.data)
        navigate('/products')
      }
    } catch (err) { console.error(err) }
  }

  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="container container-app">
      <div className="card card-app auth-card">
        <h2 className="auth-title">Welcome to Nimix Computers</h2>
        <form onSubmit={handleSubmit} className="auth-form row g-4">
          <div className="col-12">
            <label className="form-label">Email</label>
            <input 
              className="form-control form-control-lg" 
              name="email" 
              type="email"
              placeholder="Enter your email" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="col-12">
            <label className="form-label">Password</label>
            <input 
              className="form-control form-control-lg" 
              name="password" 
              type="password" 
              placeholder="Enter your password"
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="col-12 mt-4">
            <button className="btn btn-primary btn-lg w-100" type="submit">
              Sign In
            </button>
          </div>
        </form>
        <div className="auth-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
      <button 
        className="theme-toggle"
        onClick={toggleTheme}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <i className={`bi bi-${isDark ? "sun" : "moon"}`} />
      </button>
    </div>
  )
}
