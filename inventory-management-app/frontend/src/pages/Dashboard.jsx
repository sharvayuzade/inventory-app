import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const SAMPLE_PRODUCTS = [
  { _id: '1', name: 'NVIDIA RTX 4060', sku: 'GPU-4060', quantity: 5, reorderLevel: 3, price: 35999, status: 'In Stock', category: 'Graphics Cards' },
  { _id: '2', name: 'Intel Core i7-13700K', sku: 'CPU-13700K', quantity: 2, reorderLevel: 3, price: 42999, status: 'Low Stock', category: 'Processors' },
  { _id: '3', name: 'Hikvision 4MP Camera', sku: 'CCTV-4MP', quantity: 15, reorderLevel: 5, price: 2499, status: 'In Stock', category: 'CCTV' },
  { _id: '4', name: 'ROG Strix Gaming Laptop', sku: 'LAP-ROG', quantity: 1, reorderLevel: 2, price: 129999, status: 'Low Stock', category: 'Laptops' },
  { _id: '5', name: 'Gaming PC RTX 4070', sku: 'PC-4070', quantity: 3, reorderLevel: 2, price: 149999, status: 'In Stock', category: 'Desktop PCs' },
  { _id: '6', name: 'Corsair 32GB RAM', sku: 'RAM-32', quantity: 8, reorderLevel: 5, price: 12999, status: 'In Stock', category: 'Memory' },
  { _id: '7', name: 'Samsung 1TB SSD', sku: 'SSD-1TB', quantity: 4, reorderLevel: 6, price: 8999, status: 'Low Stock', category: 'Storage' },
  { _id: '8', name: 'Logitech G Pro Mouse', sku: 'MS-GPRO', quantity: 12, reorderLevel: 8, price: 5999, status: 'In Stock', category: 'Peripherals' }
]

export default function Dashboard(){
  const [stats, setStats] = useState({ total: 0, value: 0, lowStock: 0, categories: 0 })
  const [products] = useState(SAMPLE_PRODUCTS)
  const navigate = useNavigate()

  useEffect(()=>{
    setStats({
      total: products.length,
      value: products.reduce((sum, p) => sum + (p.price * p.quantity), 0),
      lowStock: products.filter(p => p.quantity < p.reorderLevel).length,
      categories: new Set(products.map(p => p.category)).size
    })
  }, [products])

  const categoryStats = products.reduce((acc, p) => { acc[p.category] = (acc[p.category]||0)+1; return acc }, {})

  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount)
  }

  return (
    <div className="container container-app">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h4 className="m-0">Dashboard Overview</h4>
          <p className="text-muted mb-0">Welcome back to Nimix Computers Inventory</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/products/new')}>+ Add Product</button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card-app stats-card">
            <div className="stats-label">Total Items</div>
            <div className="stats-value">{stats.total}</div>
            <div className="text-muted">Across all categories</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-app stats-card">
            <div className="stats-label">Inventory Value</div>
            <div className="stats-value">{formatINR(stats.value)}</div>
            <div className="text-muted">Total stock value</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-app stats-card">
            <div className="stats-label">Low Stock</div>
            <div className="stats-value text-danger">{stats.lowStock}</div>
            <div className="text-muted">Items below threshold</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-app stats-card">
            <div className="stats-label">Categories</div>
            <div className="stats-value">{stats.categories}</div>
            <div className="text-muted">Active categories</div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-8">
          <div className="card-app">
            <div className="p-4 border-bottom border-secondary">
              <h5 className="m-0">Low Stock Alerts</h5>
              <div className="text-muted">Items that need attention</div>
            </div>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Current Stock</th>
                    <th>Reorder Level</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {products.filter(p => p.quantity < p.reorderLevel).map(p => (
                    <tr key={p._id} onClick={() => navigate(`/products/${p._id}/edit`)} style={{ cursor: 'pointer' }}>
                      <td>{p.name}</td>
                      <td>{p.quantity}</td>
                      <td>{p.reorderLevel}</td>
                      <td>
                        <span className="badge bg-danger-subtle text-danger rounded-pill px-3">Low Stock</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card-app">
            <div className="p-4 border-bottom border-secondary">
              <h5 className="m-0">Category Overview</h5>
              <div className="text-muted">Distribution by category</div>
            </div>
            <div className="p-4">
              {Object.entries(categoryStats).map(([name, count]) => (
                <div key={name} className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span>{name}</span>
                    <span className="badge bg-primary-subtle text-primary rounded-pill px-3">{count} items</span>
                  </div>
                  <div className="progress" style={{ height: '6px' }}>
                    <div className="progress-bar bg-primary" style={{ width: `${(count / stats.total) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card-app">
        <div className="p-4 border-bottom border-secondary">
          <h4 className="m-0">Recent Products</h4>
          <div className="text-muted">Latest inventory items</div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id} onClick={() => navigate(`/products/${p._id}/edit`)} style={{ cursor: 'pointer' }}>
                  <td>{p.name}</td>
                  <td className="text-muted">{p.sku}</td>
                  <td>{p.quantity}</td>
                  <td>{formatINR(p.price)}</td>
                  <td><span className={`badge bg-${p.status === 'In Stock' ? 'success' : 'danger'}-subtle text-${p.status === 'In Stock' ? 'success' : 'danger'} rounded-pill px-3`}>{p.status}</span></td>
                  <td>{p.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
