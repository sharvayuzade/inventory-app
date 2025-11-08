import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SAMPLE_SUPPLIERS = [
  { id: 's1', name: 'BrightLights', contact: 'info@brightlights.com', phone: '+1 555-0101' },
  { id: 's2', name: 'CableWorks', contact: 'sales@cableworks.co', phone: '+1 555-0202' },
  { id: 's3', name: 'FurniCo', contact: 'hello@furnico.com', phone: '+1 555-0303' }
]

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
            </tr>
          </thead>
          <tbody>
            {suppliers.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td className="text-muted">{s.contact}</td>
                <td>{s.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
