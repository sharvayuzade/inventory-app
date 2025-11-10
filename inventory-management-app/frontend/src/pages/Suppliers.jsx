import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { suppliers as SAMPLE_SUPPLIERS } from '../data/suppliers'

const SupplierList = () => {
  return (
    <div className="card-app p-3">
      <table className="table table-hover mb-0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Categories</th>
          </tr>
        </thead>
        <tbody>
          {SAMPLE_SUPPLIERS.map(s => (
            <tr key={s.id} onClick={() => navigate(`/suppliers/${s.id}/edit`)} style={{ cursor: 'pointer' }}>
              <td>{s.name}</td>
              <td className="text-muted">{s.contact}</td>
              <td>{s.phone}</td>
              <td>{s.address}</td>
              <td>
                <div className="d-flex gap-1 flex-wrap">
                  {s.categories.map(cat => (
                    <span key={cat} className="badge bg-primary-subtle text-primary rounded-pill px-2">
                      {cat}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Suppliers(){
  const [suppliers] = useState(SAMPLE_SUPPLIERS)
  const navigate = useNavigate()

  return (
    <div className="container container-app">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Suppliers</h2>
        <button className="btn btn-primary" onClick={() => navigate('/suppliers/new')}>Add Supplier</button>
      </div>

      <div className="card-app p-3">
        <table className="table table-hover mb-0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Categories</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map(s => (
              <tr key={s.id} onClick={() => navigate(`/suppliers/${s.id}/edit`)} style={{ cursor: 'pointer' }}>
                <td>{s.name}</td>
                <td className="text-muted">{s.contact}</td>
                <td>{s.phone}</td>
                <td>{s.address}</td>
                <td>
                  <div className="d-flex gap-1 flex-wrap">
                    {s.categories.map(cat => (
                      <span key={cat} className="badge bg-primary-subtle text-primary rounded-pill px-2">
                        {cat}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
