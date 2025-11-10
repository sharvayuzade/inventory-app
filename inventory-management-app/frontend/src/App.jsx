import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductForm from './pages/ProductForm'
import Suppliers from './pages/Suppliers'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />

          <Route path="/products" element={<ProtectedRoute><Products/></ProtectedRoute>} />
          <Route path="/products/new" element={<ProtectedRoute><ProductForm/></ProtectedRoute>} />
          <Route path="/products/:id/edit" element={<ProtectedRoute><ProductForm/></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/suppliers" element={<ProtectedRoute><Suppliers/></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings/></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}
