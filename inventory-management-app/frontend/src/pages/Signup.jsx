import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signup(){
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/register', form)
      if (res.data?.token) {
        login(res.data)
        navigate('/products')
      }
    } catch (err) { console.error(err) }
  }

  return (
    <div className="container container-app">
      <div className="card card-app p-4">
        <h3 className="mb-3">Create an account</h3>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-12">
            <label className="form-label">Name</label>
            <input className="form-control" name="name" placeholder="Name" onChange={handleChange} required />
          </div>
          <div className="col-12">
            <label className="form-label">Email</label>
            <input className="form-control" name="email" placeholder="Email" onChange={handleChange} required />
          </div>
          <div className="col-12">
            <label className="form-label">Password</label>
            <input className="form-control" name="password" placeholder="Password" type="password" onChange={handleChange} required />
          </div>
          <div className="col-12">
            <button className="btn btn-primary w-100" type="submit">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  )
}
