import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

const SAMPLE_DATA = [
  { _id: '1', name: 'USB Cable', sku: 'CB-003', quantity: 156, reorderLevel: 50, price: 9.99, status: 'In Stock', category: 'Peripherals' },
  { _id: '2', name: 'HP All-in-One', sku: 'LP-006', quantity: 22, reorderLevel: 15, price: 79.99, status: 'In Stock', category: 'Desktops' }
]

export default function Products() {
  const [products] = useState(SAMPLE_DATA)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Peripherals')
  const navigate = useNavigate()

  const filteredProducts = products.filter(p => 
    (category === 'All' || p.category === category) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || 
     p.sku.toLowerCase().includes(search.toLowerCase()))
  )

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    try {
      await api.delete(`/products/${id}`)
    } catch (err) { 
      console.error(err) 
    }
  }

  const calculateTotalValue = (product) => {
    return (product.price * product.quantity).toFixed(2)
  }

  const categories = ['All', 'Peripherals', 'Desktops', 'Laptops']

  return (
    <div className="container container-app">
      <div className="card-app p-4 mb-4">
        <h4 className="mb-4">Search & Filter</h4>
        
        <div className="d-flex gap-3 align-items-center mb-4">
          <div className="flex-grow-1 position-relative">
            <i className="bi bi-search position-absolute ms-3" style={{top: '12px'}}></i>
            <input 
              type="text" 
              className="form-control form-control-lg ps-5" 
              placeholder="Search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="btn btn-lg btn-primary px-4">
            <i className="bi bi-download me-2"></i>
            Export
          </button>
        </div>

        <div className="d-flex gap-2">
          {categories.map(cat => (
            <button 
              key={cat}
              className={"btn " + (category === cat ? 'btn-primary' : 'btn-outline-secondary')}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="card-app">
        <div className="p-4 border-bottom border-secondary">
          <h4 className="m-0">Inventory List</h4>
          <div className="text-muted">Showing {filteredProducts.length} of {products.length} products</div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Quantity</th>
                <th>Reorder Level</th>
                <th>Price</th>
                <th>Total Value</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(p => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td className="text-muted">{p.sku}</td>
                  <td>{p.quantity}</td>
                  <td>{p.reorderLevel}</td>
                  <td>${p.price}</td>
                  <td className="text-success">${calculateTotalValue(p)}</td>
                  <td>
                    <span className="badge bg-success-subtle text-success rounded-pill px-3">
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-link btn-sm text-primary p-0 me-3"
                      onClick={() => navigate(`/products/${p._id}/edit`)}
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button 
                      className="btn btn-link btn-sm text-danger p-0" 
                      onClick={() => handleDelete(p._id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}