import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'

export default function ProductForm(){
  const [form, setForm] = useState({ name: '', sku: '', quantity: 0, price: 0, supplier: '', description: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(()=>{
    if (!id) return
    const load = async () => {
      try {
        const res = await api.get(`/products/${id}`)
        setForm({
          name: res.data.name || '',
          sku: res.data.sku || '',
          quantity: res.data.quantity || 0,
          price: res.data.price || 0,
          supplier: res.data.supplier || '',
          description: res.data.description || '',
        })
      } catch (err) { console.error(err) }
    }
    load()
  }, [id])

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true)
      if (id) {
        await api.put(`/products/${id}`, form)
      } else {
        await api.post('/products', form)
      }
      navigate('/products')
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  return (
    <div className="container container-app">
      <div className="card card-app p-4" style={{ maxWidth: 680, margin: '40px auto' }}>
        <h2 className="mb-4 text-white fw-bold">{id ? 'Edit' : 'Add'} Product</h2>
        <form onSubmit={handleSubmit} className="row g-4">
          <div className="col-md-6">
            <label className="form-label text-white">Name</label>
            <input 
              className="form-control form-control-lg" 
              name="name" 
              placeholder="Enter product name" 
              value={form.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="col-md-6">
            <label className="form-label text-white">SKU</label>
            <input 
              className="form-control form-control-lg" 
              name="sku" 
              placeholder="Enter product SKU" 
              value={form.sku} 
              onChange={handleChange} 
            />
          </div>
          <div className="col-md-3">
            <label className="form-label text-white">Quantity</label>
            <input 
              className="form-control form-control-lg" 
              name="quantity" 
              type="number" 
              placeholder="0" 
              value={form.quantity} 
              onChange={handleChange} 
            />
          </div>
          <div className="col-md-3">
            <label className="form-label text-white">Price</label>
            <input 
              className="form-control form-control-lg" 
              name="price" 
              type="number" 
              placeholder="0.00" 
              value={form.price} 
              onChange={handleChange} 
            />
          </div>
          <div className="col-md-6">
            <label className="form-label text-white">Supplier</label>
            <input 
              className="form-control form-control-lg" 
              name="supplier" 
              placeholder="Enter supplier name" 
              value={form.supplier} 
              onChange={handleChange} 
            />
          </div>
          <div className="col-12">
            <label className="form-label text-white">Description</label>
            <textarea 
              className="form-control form-control-lg" 
              name="description" 
              placeholder="Enter product description" 
              value={form.description} 
              onChange={handleChange}
              rows="3"
            />
          </div>
          <div className="col-12 mt-4">
            <button 
              className="btn btn-primary btn-lg px-5" 
              type="submit" 
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
