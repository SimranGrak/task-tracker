import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', country: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post('/auth/signup', form);
    localStorage.setItem('token', res.data.token);
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        {['name', 'email', 'password', 'country'].map((field) => (
          <input
            key={field}
            name={field}
            type={field === 'password' ? 'password' : 'text'}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full mb-4 px-4 py-2 border rounded"
            onChange={handleChange}
            required
          />
        ))}
        <button className="w-full bg-blue-500 text-white py-2 rounded">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
