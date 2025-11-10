import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Products from './pages/Products'
import ProductForm from './pages/ProductForm'
import Suppliers from './pages/Suppliers'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'
import './styles/layout.css'
import './styles/header.css'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <>
                    <div className="app-container">
                      <Header />
                      <div className="app-content">
                        <Navbar />
                        <main className="main-content">
                          <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/dashboard" element={<Navigate to="/" replace />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/products/new" element={<ProductForm />} />
                            <Route path="/products/:id/edit" element={<ProductForm />} />
                            <Route path="/suppliers" element={<Suppliers />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/settings" element={<Settings />} />
                          </Routes>
                        </main>
                      </div>
                    </div>
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}
