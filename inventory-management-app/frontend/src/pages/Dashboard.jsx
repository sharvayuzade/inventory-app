import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const SAMPLE_PRODUCTS = [
  // Graphics Cards
  { _id: '1', name: 'NVIDIA RTX 4090 24GB', sku: 'GPU-4090', quantity: 2, reorderLevel: 2, price: 169999, status: 'In Stock', category: 'Graphics Cards', brand: 'ASUS ROG STRIX', image: 'https://example.com/images/4090.jpg' },
  { _id: '2', name: 'NVIDIA RTX 4080 16GB', sku: 'GPU-4080', quantity: 3, reorderLevel: 2, price: 129999, status: 'In Stock', category: 'Graphics Cards', brand: 'MSI Gaming X Trio', image: 'https://example.com/images/4080.jpg' },
  { _id: '3', name: 'AMD RX 7900 XTX', sku: 'GPU-7900XTX', quantity: 1, reorderLevel: 2, price: 109999, status: 'Low Stock', category: 'Graphics Cards', brand: 'Sapphire Nitro+', image: 'https://example.com/images/7900xtx.jpg' },
  
  // Processors
  { _id: '4', name: 'Intel Core i9-13900KS', sku: 'CPU-13900KS', quantity: 2, reorderLevel: 2, price: 64999, status: 'In Stock', category: 'Processors', brand: 'Intel', image: 'https://example.com/images/13900ks.jpg' },
  { _id: '5', name: 'AMD Ryzen 9 7950X3D', sku: 'CPU-7950X3D', quantity: 1, reorderLevel: 2, price: 59999, status: 'Low Stock', category: 'Processors', brand: 'AMD', image: 'https://example.com/images/7950x3d.jpg' },
  
  // Motherboards
  { _id: '6', name: 'ROG MAXIMUS Z790 HERO', sku: 'MB-Z790-HERO', quantity: 3, reorderLevel: 2, price: 49999, status: 'In Stock', category: 'Motherboards', brand: 'ASUS', image: 'https://example.com/images/z790hero.jpg' },
  { _id: '7', name: 'X670E AORUS MASTER', sku: 'MB-X670E', quantity: 2, reorderLevel: 2, price: 45999, status: 'In Stock', category: 'Motherboards', brand: 'Gigabyte', image: 'https://example.com/images/x670e.jpg' },
  
  // Memory
  { _id: '8', name: 'Corsair Dominator 32GB DDR5', sku: 'RAM-DOM32', quantity: 6, reorderLevel: 4, price: 15999, status: 'In Stock', category: 'Memory', brand: 'Corsair', image: 'https://example.com/images/dominator.jpg' },
  { _id: '9', name: 'G.Skill Trident Z5 RGB 64GB', sku: 'RAM-TZ64', quantity: 2, reorderLevel: 3, price: 29999, status: 'Low Stock', category: 'Memory', brand: 'G.Skill', image: 'https://example.com/images/tridentz5.jpg' },
  
  // Storage
  { _id: '10', name: 'Samsung 990 PRO 2TB', sku: 'SSD-990-2TB', quantity: 4, reorderLevel: 3, price: 19999, status: 'In Stock', category: 'Storage', brand: 'Samsung', image: 'https://example.com/images/990pro.jpg' },
  { _id: '11', name: 'WD Black SN850X 4TB', sku: 'SSD-SN850X-4TB', quantity: 2, reorderLevel: 2, price: 39999, status: 'In Stock', category: 'Storage', brand: 'Western Digital', image: 'https://example.com/images/sn850x.jpg' },
  
  // Power Supplies
  { _id: '12', name: 'ROG THOR 1200W Platinum', sku: 'PSU-THOR-1200', quantity: 3, reorderLevel: 2, price: 29999, status: 'In Stock', category: 'Power Supplies', brand: 'ASUS', image: 'https://example.com/images/thor1200.jpg' },
  { _id: '13', name: 'Corsair HX1000i', sku: 'PSU-HX1000i', quantity: 1, reorderLevel: 2, price: 24999, status: 'Low Stock', category: 'Power Supplies', brand: 'Corsair', image: 'https://example.com/images/hx1000i.jpg' },
  
  // Cases
  { _id: '14', name: 'Lian Li O11 Dynamic EVO', sku: 'CASE-O11-EVO', quantity: 4, reorderLevel: 3, price: 15999, status: 'In Stock', category: 'Cases', brand: 'Lian Li', image: 'https://example.com/images/o11evo.jpg' },
  { _id: '15', name: 'Phanteks Evolv X', sku: 'CASE-EVOLV-X', quantity: 2, reorderLevel: 2, price: 19999, status: 'In Stock', category: 'Cases', brand: 'Phanteks', image: 'https://example.com/images/evolvx.jpg' },
  
  // Monitors
  { _id: '16', name: 'ASUS ROG SWIFT PG27AQN', sku: 'MON-PG27AQN', quantity: 2, reorderLevel: 2, price: 89999, status: 'In Stock', category: 'Monitors', brand: 'ASUS', image: 'https://example.com/images/pg27aqn.jpg' },
  { _id: '17', name: 'Samsung Odyssey Neo G8', sku: 'MON-G8', quantity: 1, reorderLevel: 2, price: 99999, status: 'Low Stock', category: 'Monitors', brand: 'Samsung', image: 'https://example.com/images/neog8.jpg' },
  
  // Peripherals
  { _id: '18', name: 'Razer Huntsman V2', sku: 'KB-HUNT-V2', quantity: 5, reorderLevel: 3, price: 14999, status: 'In Stock', category: 'Peripherals', brand: 'Razer', image: 'https://example.com/images/huntsman.jpg' },
  { _id: '19', name: 'Logitech G Pro X Superlight', sku: 'MS-PROX', quantity: 7, reorderLevel: 5, price: 12999, status: 'In Stock', category: 'Peripherals', brand: 'Logitech', image: 'https://example.com/images/superlight.jpg' },
  
  // CCTV & Security
  { _id: '20', name: 'Hikvision ColorVu 4MP', sku: 'CCTV-4MP-CV', quantity: 12, reorderLevel: 6, price: 3999, status: 'In Stock', category: 'CCTV', brand: 'Hikvision', image: 'https://example.com/images/colorvu.jpg' },
  { _id: '21', name: 'Dahua 4K NVR', sku: 'NVR-4K', quantity: 2, reorderLevel: 2, price: 24999, status: 'In Stock', category: 'CCTV', brand: 'Dahua', image: 'https://example.com/images/nvr.jpg' }
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
                <th>Brand</th>
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
                  <td className="text-muted">{p.brand}</td>
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
