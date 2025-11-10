import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { FaUser } from 'react-icons/fa'

export default function Profile() {
  const { user } = useAuth()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')

  const handleSave = () => {
    // No backend integration in this basic page. Just toggle editing off.
    setEditing(false)
    // Could integrate context update later
  }

  return (
    <div className="container container-app">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0"><FaUser style={{marginRight:8}}/>Profile</h2>
      </div>

      <div className="card-app p-4" style={{ maxWidth: 800 }}>
        <div className="d-flex align-items-center mb-4">
          <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, color: '#666', marginRight: 20 }}>
            {name ? name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            {!editing ? (
              <>
                <h4 className="m-0">{name || 'Unnamed User'}</h4>
                <p className="text-muted mb-0">{email || 'No email provided'}</p>
              </>
            ) : (
              <>
                <input className="form-control mb-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Display name" />
                <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
              </>
            )}
          </div>
        </div>

        <div>
          {!editing ? (
            <button className="btn btn-primary" onClick={() => setEditing(true)}>Edit Profile</button>
          ) : (
            <>
              <button className="btn btn-success mr-2" onClick={handleSave}>Save</button>
              <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
