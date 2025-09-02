import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import "./register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Technician',
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
      const response = await axios.post('https://oralvis-healthcare-application.vercel.app/api/auth/register', formData);
      alert('Registration successful! Please log in.');
      setFormData({
        username: '',
        email: '',
        password: '',
        role: '',
      });
      setSuccess('Registration successful! Please log in.');
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Server Error');
      setSuccess(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          placeholder="Enter your username"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter your password"
        />

        <label htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Select your role</option>
          <option value="Technician">Technician</option>
          <option value="Dentist">Dentist</option>
        </select>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>

        {/* Link to Login */}
        <p className="form-switch">
          Already have an account? <Link to="/login">Login here</Link>
        </p>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
}

export default Register;
