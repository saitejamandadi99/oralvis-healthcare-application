import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Register from './pages/Register/register';
import Login from './pages/Login/Login';
import DentistScans from './pages/DentistScans/DentistScans';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dentist-dashboard" element={<DentistScans />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
