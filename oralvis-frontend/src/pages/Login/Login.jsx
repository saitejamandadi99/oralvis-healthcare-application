import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import cookie from 'js-cookie';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log(response.data);
      if (response.data.token) {
        cookie.set('token', response.data.token, { expires: 1 }); // 1 day expiration
        cookie.set('userDetails', JSON.stringify(response.data.userDetails), { expires: 1 });
        setSuccess('Login successful! Redirecting...');
        setError(null);

        if (response.data.userDetails.role === 'Technician') {
          navigate('/technician-dashboard');
        } else if (response.data.userDetails.role === 'Dentist') {
          navigate('/dentist-dashboard');
        } else {
          navigate('/'); // fallback
        }
      }
    }
    catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || 'Server Error');
      setSuccess(null);
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default Login;
