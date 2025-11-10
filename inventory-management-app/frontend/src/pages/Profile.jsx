import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || 'user'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    updateUser(formData)
    setIsEditing(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card-app text-center p-4">
            <img 
              src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&size=150&background=random`}
              alt="Profile"
              className="rounded-circle mb-3"
            />
            <h4>{user?.name}</h4>
            <p className="text-muted">{user?.role}</p>
            <button 
              className="btn btn-primary mt-3"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card-app p-4">
            <h4 className="mb-4">Profile Information</h4>
            
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.role}
                    disabled
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </form>
            ) : (
              <div>
                <div className="row mb-3">
                  <div className="col-4 text-muted">Full Name</div>
                  <div className="col-8">{user?.name}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-4 text-muted">Email</div>
                  <div className="col-8">{user?.email}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-4 text-muted">Phone</div>
                  <div className="col-8">{user?.phone || '-'}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-4 text-muted">Role</div>
                  <div className="col-8">{user?.role}</div>
                </div>
              </div>
            )}
          </div>

          <div className="card-app p-4 mt-4">
            <h4 className="mb-4">Activity</h4>
            <div className="timeline">
              <div className="timeline-item">
                <i className="bi bi-circle-fill text-primary"></i>
                <div>
                  <p className="mb-1">Added new product: RTX 3060 Ti</p>
                  <small className="text-muted">2 hours ago</small>
                </div>
              </div>
              <div className="timeline-item">
                <i className="bi bi-circle-fill text-success"></i>
                <div>
                  <p className="mb-1">Updated inventory levels</p>
                  <small className="text-muted">5 hours ago</small>
                </div>
              </div>
              <div className="timeline-item">
                <i className="bi bi-circle-fill text-info"></i>
                <div>
                  <p className="mb-1">Generated monthly report</p>
                  <small className="text-muted">1 day ago</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}