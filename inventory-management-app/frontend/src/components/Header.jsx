import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const notifications = [
  {
    id: 1,
    type: 'alert',
    icon: 'exclamation-circle',
    title: 'Low Stock Alert',
    message: 'RTX 3060 Ti is running low on stock',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'info',
    icon: 'info-circle',
    title: 'New Order',
    message: 'New order #1234 received',
    time: '3 hours ago'
  },
  {
    id: 3,
    type: 'success',
    icon: 'check-circle',
    title: 'Stock Updated',
    message: 'Successfully updated inventory levels',
    time: '5 hours ago'
  }
]

export default function Header() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="navbar-header">
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="d-flex align-items-center">
          <h5 className="mb-0">NimixTech Inventory</h5>
        </div>

        <div className="d-flex align-items-center gap-3">
          {/* Search */}
          <div className="d-none d-md-block">
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0">
                <i className="bi bi-search"></i>
              </span>
              <input 
                type="text" 
                className="form-control border-start-0 ps-0" 
                placeholder="Search inventory..."
              />
            </div>
          </div>

          {/* Theme Toggle */}
          <button 
            className="btn btn-icon"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <i className={`bi bi-${theme === 'dark' ? 'sun' : 'moon'}`}></i>
          </button>

          {/* Notifications */}
          <div className="position-relative">
            <button 
              className="btn btn-icon"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <i className="bi bi-bell"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {notifications.length}
              </span>
            </button>

            {showNotifications && (
              <div className="dropdown-menu dropdown-menu-end show notification-menu">
                <div className="dropdown-header d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">Notifications</h6>
                  <button className="btn btn-link btn-sm text-decoration-none">Mark all as read</button>
                </div>
                <div className="notification-list">
                  {notifications.map(notification => (
                    <div key={notification.id} className="notification-item">
                      <div className={`notification-icon text-${notification.type}`}>
                        <i className={`bi bi-${notification.icon}`}></i>
                      </div>
                      <div className="notification-content">
                        <div className="notification-title">{notification.title}</div>
                        <div className="notification-message">{notification.message}</div>
                        <div className="notification-time">{notification.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="dropdown-footer">
                  <button className="btn btn-link w-100 text-decoration-none">View all notifications</button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="position-relative">
            <button 
              className="btn btn-link p-0 text-decoration-none"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="d-flex align-items-center">
                <img 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=random`}
                  alt="Profile"
                  className="rounded-circle"
                  width="32"
                  height="32"
                />
                <div className="ms-2 d-none d-md-block">
                  <div className="fw-medium">{user?.name}</div>
                  <div className="text-muted small">{user?.role || 'User'}</div>
                </div>
              </div>
            </button>

            {showUserMenu && (
              <div className="dropdown-menu dropdown-menu-end show">
                <div className="dropdown-header">
                  <div className="fw-bold">{user?.name}</div>
                  <div className="text-muted small">{user?.email}</div>
                </div>
                <div className="dropdown-divider"></div>
                <button 
                  className="dropdown-item d-flex align-items-center"
                  onClick={() => navigate('/profile')}
                >
                  <i className="bi bi-person me-2"></i>Profile
                </button>
                <button 
                  className="dropdown-item d-flex align-items-center"
                  onClick={() => navigate('/settings')}
                >
                  <i className="bi bi-gear me-2"></i>Settings
                </button>
                <div className="dropdown-divider"></div>
                <button 
                  className="dropdown-item d-flex align-items-center text-danger"
                  onClick={logout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}