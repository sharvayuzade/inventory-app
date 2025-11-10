import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import { FaSearch, FaFileExport, FaPencilAlt, FaTrash } from 'react-icons/fa'

const SAMPLE_DATA = [
  { _id: '1', name: 'USB Cable Type-C', sku: 'CB-003', quantity: 156, reorderLevel: 50, price: 9.99, status: 'In Stock', category: 'Peripherals' },
  { _id: '2', name: 'HP All-in-One', sku: 'LP-006', quantity: 22, reorderLevel: 15, price: 799.99, status: 'In Stock', category: 'Desktops' },
  { _id: '3', name: 'RTX 4090', sku: 'GPU-001', quantity: 5, reorderLevel: 3, price: 1599.99, status: 'Low Stock', category: 'Graphics Cards' },
  { _id: '4', name: 'Intel i9-13900K', sku: 'CPU-001', quantity: 12, reorderLevel: 5, price: 599.99, status: 'In Stock', category: 'Processors' },
  { _id: '5', name: 'Samsung 990 Pro 2TB', sku: 'SSD-001', quantity: 25, reorderLevel: 10, price: 199.99, status: 'In Stock', category: 'Storage' },
  { _id: '6', name: 'Corsair 32GB DDR5', sku: 'RAM-001', quantity: 30, reorderLevel: 15, price: 149.99, status: 'In Stock', category: 'Memory' },
  { _id: '7', name: 'ASUS ROG STRIX Z790', sku: 'MB-001', quantity: 8, reorderLevel: 5, price: 499.99, status: 'In Stock', category: 'Motherboards' },
  { _id: '8', name: 'Logitech G Pro X', sku: 'KB-001', quantity: 4, reorderLevel: 5, price: 149.99, status: 'Low Stock', category: 'Peripherals' },
  { _id: '9', name: 'ASUS ROG Swift 27"', sku: 'MON-001', quantity: 3, reorderLevel: 2, price: 699.99, status: 'In Stock', category: 'Monitors' },
  { _id: '10', name: 'Corsair RM850x', sku: 'PSU-001', quantity: 15, reorderLevel: 8, price: 129.99, status: 'In Stock', category: 'Power Supplies' },
  { _id: '11', name: 'Lian Li O11 Dynamic', sku: 'CASE-001', quantity: 6, reorderLevel: 3, price: 159.99, status: 'In Stock', category: 'Cases' },
  { _id: '12', name: 'Arctic Liquid Freezer II', sku: 'COOL-001', quantity: 7, reorderLevel: 5, price: 119.99, status: 'In Stock', category: 'Cooling' },
  { _id: '13', name: 'WD Black 4TB', sku: 'HDD-001', quantity: 20, reorderLevel: 8, price: 129.99, status: 'In Stock', category: 'Storage' },
  { _id: '14', name: 'Razer DeathAdder V3', sku: 'MS-001', quantity: 2, reorderLevel: 5, price: 69.99, status: 'Low Stock', category: 'Peripherals' },
  { _id: '15', name: 'AMD Ryzen 9 7950X', sku: 'CPU-002', quantity: 8, reorderLevel: 4, price: 699.99, status: 'In Stock', category: 'Processors' }
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
        <h4 className="mb-4"><FaSearch style={{marginRight:8}}/>Search & Filter</h4>
        
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
            <FaFileExport className="me-2" />
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
                      title="Edit"
                    >
                      <FaPencilAlt />
                    </button>
                    <button 
                      className="btn btn-link btn-sm text-danger p-0" 
                      onClick={() => handleDelete(p._id)}
                      title="Delete"
                    >
                      <FaTrash />
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