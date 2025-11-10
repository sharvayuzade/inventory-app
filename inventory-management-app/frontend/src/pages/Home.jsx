import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import { FaBoxes, FaLayerGroup, FaChartLine } from 'react-icons/fa'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// Custom styles for the slider
const customSliderStyles = `
  .slick-prev, .slick-next {
    z-index: 1;
    width: 40px;
    height: 40px;
  }
  .slick-prev {
    left: 25px;
  }
  .slick-next {
    right: 25px;
  }
  .slick-dots {
    bottom: -40px;  /* Move dots below the content */
    z-index: 1;
  }
  .slick-dots li button:before {
    color: #4da6ff;  /* Match the theme blue color */
    font-size: 10px;
    opacity: 0.5;
  }
  .slick-dots li.slick-active button:before {
    color: #4da6ff;
    opacity: 1;
  }
  .slick-slider {
    margin-bottom: 50px;  /* Add space for the dots */
  }
`

const SAMPLE_PRODUCTS = [
  { _id: '1', name: 'RTX 3060 Ti', sku: 'GPU-3060TI', quantity: 6, reorderLevel: 3, price: 29999, status: 'In Stock', category: 'Graphics Cards' },
  { _id: '2', name: 'AMD Ryzen 5 7600X', sku: 'CPU-7600X', quantity: 2, reorderLevel: 3, price: 34999, status: 'Low Stock', category: 'Processors' },
  { _id: '3', name: 'WD Black 2TB NVMe', sku: 'SSD-2TB', quantity: 15, reorderLevel: 5, price: 19999, status: 'In Stock', category: 'Storage' },
  { _id: '4', name: 'Razer Huntsman', sku: 'KB-HUNT', quantity: 4, reorderLevel: 5, price: 14999, status: 'Low Stock', category: 'Peripherals' },
  { _id: '5', name: 'ViewSonic 27" 165Hz', sku: 'MON-VS27', quantity: 3, reorderLevel: 2, price: 24999, status: 'In Stock', category: 'Monitors' }
]

export default function Home() {
  const [stats, setStats] = useState({ total: 0, value: 0, lowStock: 0, categories: 0 })
  const [products] = useState(SAMPLE_PRODUCTS)
  const { user } = useAuth()
  const navigate = useNavigate()

  // Add custom styles to the document
  React.useEffect(() => {
    const styleElement = document.createElement('style')
    styleElement.textContent = customSliderStyles
    document.head.appendChild(styleElement)
    return () => styleElement.remove()
  }, [])

  // Welcome section styles
  const welcomeStyles = {
    textAlign: 'center',
    padding: '2rem',
    marginBottom: '2rem',
    backgroundColor: '#1a1a1a',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(255,255,255,0.1)',
    color: '#ffffff'
  }

  const sliderSettings = {
    dots: false, // Completely disable dots
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true
  }

  const slideStyles = {
    padding: '2rem 2rem 0 2rem', // Remove bottom padding to prevent extra space
    textAlign: 'center',
    display: 'flex !important',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const slideImageStyles = {
    width: '100%',
    maxWidth: '800px',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '1rem',
    display: 'block',
    margin: '0 auto'
  }

  const headingStyles = {
    color: '#ffffff'
  }

  const subHeadingStyles = {
    color: '#4da6ff'
  }

  const paragraphStyles = {
    color: '#cccccc'
  }

  const iconStyles = {
    fontSize: '3rem',
    marginBottom: '1rem',
    color: '#4da6ff'
  }

  const featureBoxStyles = {
    padding: '1.5rem',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-5px)'
    }
  }

  React.useEffect(() => {
    setStats({
      total: products.length,
      value: products.reduce((sum, p) => sum + (p.price * p.quantity), 0),
      lowStock: products.filter(p => p.quantity < p.reorderLevel).length,
      categories: new Set(products.map(p => p.category)).size
    })
  }, [products])

  const categoryStats = React.useMemo(() => {
    const stats = products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1
      return acc
    }, {})
    return Object.entries(stats).map(([name, count]) => ({ name, count }))
  }, [products])

  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount)
  }

  return (
    <div className="container container-app">
      {/* Welcome Section */}
      <div style={welcomeStyles}>
        <h1 className="display-4 mb-3" style={headingStyles}>Welcome to Inventory Management System</h1>
        <p className="lead mb-4" style={subHeadingStyles}>Your complete solution for managing inventory, tracking products, and optimizing stock levels</p>
        
        {/* Slideshow Section */}
        <div style={{ 
          maxWidth: '1000px', 
          margin: '0 auto 3rem auto',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Slider {...sliderSettings} style={{ width: '100%' }}>
            <div style={slideStyles}>
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Warehouse Management"
                style={slideImageStyles}
              />
              <h3 style={headingStyles}>Smart Inventory Management</h3>
              <p style={paragraphStyles}>Streamline your warehouse operations</p>
            </div>
            <div style={slideStyles}>
              <img 
                src="https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Real-time Analytics"
                style={slideImageStyles}
              />
              <h3 style={headingStyles}>Real-time Analytics</h3>
              <p style={paragraphStyles}>Make data-driven decisions</p>
            </div>
            <div style={slideStyles}>
              <img 
                src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Digital Solutions"
                style={slideImageStyles}
              />
              <h3 style={headingStyles}>Modern Digital Solutions</h3>
              <p style={paragraphStyles}>Embrace the future of inventory management</p>
            </div>
          </Slider>
        </div>

        {/* Features Section */}
        <div className="row">
          <div className="col-md-4" style={featureBoxStyles}>
            <FaBoxes style={iconStyles} />
            <h5 style={headingStyles}>Track Products</h5>
            <p style={paragraphStyles}>Monitor your inventory levels and get alerts for low stock</p>
          </div>
          <div className="col-md-4" style={featureBoxStyles}>
            <FaLayerGroup style={iconStyles} />
            <h5 style={headingStyles}>Manage Categories</h5>
            <p style={paragraphStyles}>Organize products by categories for better management</p>
          </div>
          <div className="col-md-4" style={featureBoxStyles}>
            <FaChartLine style={iconStyles} />
            <h5 style={headingStyles}>Real-time Updates</h5>
            <p style={paragraphStyles}>Stay updated with real-time inventory changes</p>
          </div>
        </div>
      </div>

      {user ? (
        <>
          {/* Dashboard Overview */}
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <div>
              <h4 className="m-0">Dashboard Overview</h4>
              <p className="text-muted mb-0">Your Inventory at a Glance</p>
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
                        <tr key={p._id}>
                          <td>{p.name}</td>
                          <td>{p.quantity}</td>
                          <td>{p.reorderLevel}</td>
                          <td>
                            <span className="badge bg-danger-subtle text-danger rounded-pill px-3">
                              Low Stock
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
        </>
      ) : (
        <div className="text-center mt-4">
          <p className="lead text-muted">Sign in to access your dashboard — view inventory stats, recent products, and manage suppliers.</p>
          <div className="mt-3">
            <button className="btn btn-primary me-2" onClick={() => navigate('/signup')}>Get Started</button>
            <button className="btn btn-outline-light" onClick={() => navigate('/login')}>Login</button>
          </div>
        </div>
      )}
    </div>
  )
}