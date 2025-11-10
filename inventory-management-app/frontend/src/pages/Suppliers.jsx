import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTruck } from 'react-icons/fa'

const SAMPLE_SUPPLIERS = [
  { id: 's1', name: 'Super Computers', contact: 'info@supercomputers.com', phone: '+11 555-0101' },
  { id: 's2', name: 'CableWorks', contact: 'sales@cableworks.co', phone: '+91 555-0202' },
  { id: 's3', name: 'Hewlett Packard', contact: 'hello@hp.com', phone: '+19 555-0303' },
  { id: 's4', name: 'ASUS Technology', contact: 'support@asus.com', phone: '+886 555-0404' },
  { id: 's5', name: 'Kingston Memory', contact: 'sales@kingston.com', phone: '+1 555-0505' },
  { id: 's6', name: 'Western Digital', contact: 'support@wd.com', phone: '+1 555-0606' },
  { id: 's7', name: 'AMD Processors', contact: 'enterprise@amd.com', phone: '+1 555-0707' },
  { id: 's8', name: 'Nvidia Corporation', contact: 'b2b@nvidia.com', phone: '+1 555-0808' },
  { id: 's9', name: 'Corsair Components', contact: 'sales@corsair.com', phone: '+1 555-0909' },
  { id: 's10', name: 'Logitech International', contact: 'orders@logitech.com', phone: '+41 555-1010' },
  { id: 's11', name: 'Samsung Electronics', contact: 'b2b@samsung.com', phone: '+82 555-1111' },
  { id: 's12', name: 'MSI Technology', contact: 'business@msi.com', phone: '+886 555-1212' }
]

export default function Suppliers(){
  const [suppliers] = useState(SAMPLE_SUPPLIERS)
  const navigate = useNavigate()

  return (
    <div className="container container-app">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0"><FaTruck style={{marginRight:8}}/>Suppliers</h2>
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
