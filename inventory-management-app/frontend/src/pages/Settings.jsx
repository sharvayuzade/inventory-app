import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function Settings() {
  const { theme, toggleTheme } = useTheme()
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    stockAlerts: true,
    language: 'en',
    currency: 'INR',
    dateFormat: 'DD/MM/YYYY'
  })

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Settings</h2>

      <div className="row">
        <div className="col-md-3">
          <div className="card-app p-3 mb-4">
            <div className="nav flex-column nav-pills">
              <button className="nav-link active text-start">
                <i className="bi bi-gear me-2"></i>General
              </button>
              <button className="nav-link text-start">
                <i className="bi bi-bell me-2"></i>Notifications
              </button>
              <button className="nav-link text-start">
                <i className="bi bi-shield-lock me-2"></i>Security
              </button>
              <button className="nav-link text-start">
                <i className="bi bi-palette me-2"></i>Appearance
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="card-app p-4">
            <h4 className="mb-4">General Settings</h4>
            
            <div className="mb-4">
              <h5 className="mb-3">System Preferences</h5>
              <div className="mb-3">
                <label className="form-label">Language</label>
                <select 
                  className="form-select"
                  name="language"
                  value={settings.language}
                  onChange={handleChange}
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="mr">Marathi</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Currency</label>
                <select 
                  className="form-select"
                  name="currency"
                  value={settings.currency}
                  onChange={handleChange}
                >
                  <option value="INR">Indian Rupee (₹)</option>
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Date Format</label>
                <select 
                  className="form-select"
                  name="dateFormat"
                  value={settings.dateFormat}
                  onChange={handleChange}
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="mb-3">Theme Settings</h5>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="themeToggle"
                  checked={theme === 'dark'}
                  onChange={toggleTheme}
                />
                <label className="form-check-label" htmlFor="themeToggle">
                  Dark Mode
                </label>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="mb-3">Notifications</h5>
              <div className="form-check form-switch mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="notifications"
                  id="notifications"
                  checked={settings.notifications}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="notifications">
                  Enable Notifications
                </label>
              </div>

              <div className="form-check form-switch mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="emailAlerts"
                  id="emailAlerts"
                  checked={settings.emailAlerts}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="emailAlerts">
                  Email Alerts
                </label>
              </div>

              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="stockAlerts"
                  id="stockAlerts"
                  checked={settings.stockAlerts}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="stockAlerts">
                  Low Stock Alerts
                </label>
              </div>
            </div>

            <button className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}