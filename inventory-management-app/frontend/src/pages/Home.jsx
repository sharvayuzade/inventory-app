import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/dark-theme.css'

const slides = [
  {
    id: 1,
    title: 'Manage Your Inventory',
    description: 'Track your computer hardware stock efficiently',
    image: 'https://via.placeholder.com/1200x400?text=Inventory+Management',
    color: 'primary'
  },
  {
    id: 2,
    title: 'Real-time Analytics',
    description: 'Get insights about your stock levels and sales',
    image: 'https://via.placeholder.com/1200x400?text=Analytics',
    color: 'success'
  },
  {
    id: 3,
    title: 'CCTV & Security',
    description: 'Complete surveillance system inventory tracking',
    image: 'https://via.placeholder.com/1200x400?text=CCTV+Systems',
    color: 'info'
  }
]
]

const features = [
  { icon: 'pc-display', title: 'Computer Hardware', desc: 'Manage your PC components, laptops, and accessories inventory' },
  { icon: 'camera-video', title: 'CCTV Systems', desc: 'Track security camera systems and surveillance equipment' },
  { icon: 'tools', title: 'Service Center', desc: 'Keep track of repair parts and accessories' },
  { icon: 'boxes', title: 'Stock Management', desc: 'Real-time inventory tracking and alerts' },
  { icon: 'people', title: 'Supplier Network', desc: 'Maintain relationships with hardware vendors' },
  { icon: 'bar-chart', title: 'Analytics', desc: 'Monitor stock levels and inventory value' },
]

export default function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Welcome to Inventory Manager</h1>
        <p className="lead mb-4">Your smart solution for managing inventory efficiently</p>
        <div className="d-flex justify-content-center gap-3">
          <button 
            className="btn btn-primary px-4 py-2"
            onClick={() => navigate('/products/new')}
          >
            Get Started
          </button>
          <button 
            className="btn btn-outline-secondary px-4 py-2"
            onClick={() => navigate('/dashboard')}
          >
            View Dashboard
          </button>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12">
          <h2 className="h3 mb-4">Quick Actions</h2>
          <div className="row g-4">
            {quickActions.map((action, index) => (
              <div key={index} className="col-md-3">
                <div 
                  className="card-app h-100 cursor-pointer"
                  onClick={() => navigate(action.link)}
                >
                  <div className="d-flex align-items-center mb-3">
                    <i className={`bi bi-${action.icon} fs-4 text-primary me-2`}></i>
                    <h3 className="h5 mb-0">{action.title}</h3>
                  </div>
                  <p className="text-muted mb-0">{action.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-12">
          <h2 className="h3 mb-4">Key Features</h2>
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-4">
                <div className="card-app h-100">
                  <div className="d-flex align-items-center mb-3">
                    <i className={`bi bi-${feature.icon} fs-4 text-primary me-2`}></i>
                    <h3 className="h5 mb-0">{feature.title}</h3>
                  </div>
                  <p className="text-muted mb-0">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
                        </span>
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
              {categoryStats.map(cat => (
                <div key={cat.name} className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span>{cat.name}</span>
                    <span className="badge bg-primary-subtle text-primary rounded-pill px-3">
                      {cat.count} items
                    </span>
                  </div>
                  <div className="progress" style={{ height: '6px' }}>
                    <div 
                      className="progress-bar bg-primary" 
                      style={{ width: `${(cat.count / stats.total) * 100}%` }}
                    />
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
              {products.slice(0, 5).map(p => (
                <tr key={p._id} onClick={() => navigate(`/products/${p._id}/edit`)} style={{ cursor: 'pointer' }}>
                  <td>{p.name}</td>
                  <td className="text-muted">{p.sku}</td>
                  <td>{p.quantity}</td>
                  <td>{formatINR(p.price)}</td>
                  <td>
                    <span className={`badge bg-${p.status === 'In Stock' ? 'success' : 'danger'}-subtle text-${p.status === 'In Stock' ? 'success' : 'danger'} rounded-pill px-3`}>
                      {p.status}
                    </span>
                  </td>
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