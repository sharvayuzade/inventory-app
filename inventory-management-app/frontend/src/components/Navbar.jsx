import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    {
      group: 'Main',
      items: [
        { path: '/', icon: 'speedometer2', label: 'Dashboard' },
        { path: '/products', icon: 'box-seam', label: 'Products' },
        { path: '/suppliers', icon: 'truck', label: 'Suppliers' }
      ]
    },
    {
      group: 'Categories',
      items: [
        { path: '/products?category=laptops', icon: 'laptop', label: 'Laptops' },
        { path: '/products?category=components', icon: 'cpu', label: 'Components' },
        { path: '/products?category=peripherals', icon: 'keyboard', label: 'Peripherals' },
        { path: '/products?category=networking', icon: 'router', label: 'Networking' },
        { path: '/products?category=security', icon: 'camera-video', label: 'CCTV & Security' }
      ]
    }
  ]
  const [userMenu, setUserMenu] = useState(false)
  const [query, setQuery] = useState('')
  const userMenuRef = useRef(null)
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 'n1', title: 'Low stock: Keyboard', body: 'Keyboard (KB-201) is below reorder level (8).', time: '2h', read: false, link: '/products' },
    { id: 'n2', title: 'New supplier added', body: 'Supplier "BrightLights" was added.', time: '1d', read: false, link: '/suppliers' },
    { id: 'n3', title: 'Price update', body: 'USB Cable price updated to $9.99.', time: '3d', read: true, link: '/products' }
  ])
  const notifRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenu(false)
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  const submitSearch = (e) => {
    e.preventDefault()
    if (!query) return
    navigate(`/products?search=${encodeURIComponent(query)}`)
    setQuery('')
    setOpen(false)
  }

  const activeClass = ({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'

  return (
    <nav className="app-navbar">
      <div className="container container-app d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <button className="navbar-toggler" onClick={() => setOpen(v => !v)} aria-label="Toggle navigation">
            <span className="bi bi-list" />
          </button>
          <NavLink to="/" className="navbar-brand">InventoryPro</NavLink>
        </div>

        <div className={`nav-center ${open ? 'open' : ''}`}>
          <ul className="nav-links">
            <li><NavLink to="/" className={activeClass}>Home</NavLink></li>
            <li><NavLink to="/dashboard" className={activeClass}>Dashboard</NavLink></li>
            <li><NavLink to="/products" className={activeClass}>Products</NavLink></li>
            <li><NavLink to="/suppliers" className={activeClass}>Suppliers</NavLink></li>
          </ul>

          <form className="nav-search" onSubmit={submitSearch}>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products..." />
            <button type="submit" aria-label="Search"><i className="bi bi-search" /></button>
          </form>
        </div>

          <div className="nav-actions d-flex align-items-center gap-3">
            <button 
              className="btn btn-icon"
              onClick={toggleTheme}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              <i className={`bi bi-${isDark ? "sun" : "moon"}-fill`} />
            </button>
            <div className="position-relative" ref={notifRef}>
            <button className="btn-notify" title="Notifications" onClick={() => setNotifOpen(v => !v)} aria-expanded={notifOpen}>
              <i className="bi bi-bell" />
              <span className="notify-badge">{notifications.filter(n => !n.read).length}</span>
            </button>
            {notifOpen && (
              <div className="notify-dropdown card-app p-2">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <strong>Notifications</strong>
                  <button className="btn btn-link btn-sm text-secondary" onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}>Mark all read</button>
                </div>
                <div className="notify-list">
                  {notifications.length === 0 && <div className="notify-empty text-muted">No notifications</div>}
                  {notifications.map(n => (
                    <div key={n.id} className={`notify-item ${n.read ? 'read' : 'unread'}`} onClick={() => { setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x)); setNotifOpen(false); navigate(n.link) }}>
                      <div className="notify-title">{n.title}</div>
                      <div className="notify-body text-muted">{n.body}</div>
                      <div className="notify-time text-muted small">{n.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {!user && (
            <div className="d-flex align-items-center gap-2">
              <NavLink to="/signup" className="btn btn-outline-primary">Signup</NavLink>
              <NavLink to="/login" className="btn btn-primary">Login</NavLink>
            </div>
          )}

          {user && (
            <div className="user-menu-wrapper" ref={userMenuRef}>
              <button className="user-avatar" onClick={() => setUserMenu(v => !v)} aria-haspopup="true" aria-expanded={userMenu}>
                {user.avatarUrl ? <img src={user.avatarUrl} alt="avatar"/> : <span className="avatar-initial">{(user.name||'U').charAt(0)}</span>}
              </button>
              {userMenu && (
                <div className="user-dropdown card-app p-2">
                  <div className="d-flex align-items-center gap-2 p-2 border-bottom">
                    <div className="me-2">
                      {user.avatarUrl ? <img src={user.avatarUrl} alt="avatar" className="me-2"/> : <div className="avatar-initial me-2">{(user.name||'U').charAt(0)}</div>}
                    </div>
                    <div>
                      <div className="fw-semibold">{user.name}</div>
                      <div className="text-muted small">{user.email}</div>
                    </div>
                  </div>
                  <ul className="list-unstyled my-2">
                    <li><NavLink to="/profile" className="dropdown-link">Profile</NavLink></li>
                    <li><NavLink to="/settings" className="dropdown-link">Settings</NavLink></li>
                  </ul>
                  <div className="mt-2 text-end">
                    <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Logout</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
