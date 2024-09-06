// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import './App.css';
import ResourceList from './pages/ResourceList';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ProtectedRoute from './auth/ProtectedRoute';
import NotFound404 from './pages/NotFound404';
import { AuthProvider } from './auth/AuthContext';
import ReadBook from './pages/ReadBook';
import WatchVideo from './pages/WatchVideo';

function App() {
  return (
    <Router>
        <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="resources" element={<ResourceList />} />
            <Route path="read/:id" element={<ReadBook />} />
            <Route path="watch/:id" element={<WatchVideo />} />
          </Route>

          {/* NotFound Route */}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
    </AuthProvider>
      </Router>
  );
}

export default App;
