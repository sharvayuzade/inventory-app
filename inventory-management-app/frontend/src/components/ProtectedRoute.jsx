import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, initializing } = useAuth();
  // while we are checking auth state, render nothing (or a loader)
  if (initializing) return null
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
