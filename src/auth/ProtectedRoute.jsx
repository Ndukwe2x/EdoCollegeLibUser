// ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import DashboardSharedLayout from '../pagelayout/DashboardSharedLayout';

export default function ProtectedRoute() {
  const { authenticatedUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return authenticatedUser ? (
    <DashboardSharedLayout>
      <Outlet />
    </DashboardSharedLayout>
  ) : (
    <Navigate to="/login" />
  );
}
