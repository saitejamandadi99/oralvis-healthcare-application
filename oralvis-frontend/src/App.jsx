import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register/register';
import Login from './pages/Login/Login';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <h1>Welcome to OralVis-HealthCare</h1>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
