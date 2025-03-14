import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage("Username and password are required");
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        if (data.userId) {
          onLoginSuccess(data.userId);
          navigate(`/mainpage/${data.userId}`); 
        } else {
          setErrorMessage('Login successful, but no user ID returned');
        }
      } else {
        setErrorMessage(data.message || 'Invalid credentials');
      }
    } catch (error) {
      setErrorMessage('Failed to connect to server');
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Login</h2>

        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-600 mb-2">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-600 mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition duration-300">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
