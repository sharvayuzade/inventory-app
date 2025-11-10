import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { FaCog } from 'react-icons/fa'

export default function Settings(){
  const { user } = useAuth()
  const [displayName, setDisplayName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('site-theme')
      if (stored) {
        setDarkMode(stored !== 'light')
      } else {
        // fallback to body class
        setDarkMode(!document.body.classList.contains('light-theme'))
      }
    } catch (e) {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('site-theme', darkMode ? 'dark' : 'light')
    } catch (e) {}
    document.body.classList.toggle('light-theme', !darkMode)
  }, [darkMode])

  const handleSave = () => {
    // Placeholder: no backend integration
    alert('Settings saved (local only)')
  }

  return (
    <div className="container container-app">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0"><FaCog style={{marginRight:8}}/>Settings</h2>
      </div>

      <div className="card-app p-4" style={{ maxWidth: 700 }}>
        <div className="mb-3">
          <label className="form-label">Display Name</label>
          <input className="form-control" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-check form-switch mb-3">
          <input className="form-check-input" type="checkbox" id="darkModeToggle" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />
          <label className="form-check-label" htmlFor="darkModeToggle">Enable Dark Mode</label>
        </div>

        <div>
          <button className="btn btn-primary" onClick={handleSave}>Save Settings</button>
        </div>
      </div>
    </div>
  )
}
