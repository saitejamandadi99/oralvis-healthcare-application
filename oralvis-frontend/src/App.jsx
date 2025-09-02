import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import DentistScans from './pages/DentistScans/DentistScans';
import TechnicianDashboard from './pages/TechnicianDashboard/TechnicianDashboard';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dentist Dashboard */}
        <Route
          path="/dentist-dashboard"
          element={
            <ProtectedRoute allowedRoles={['Dentist']}>
              <DentistScans />
            </ProtectedRoute>
          }
        />

        {/* Protected Technician Dashboard */}
        <Route
          path="/technician-dashboard"
          element={
            <ProtectedRoute allowedRoles={['Technician']}>
              <TechnicianDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
