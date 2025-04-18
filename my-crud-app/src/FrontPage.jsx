import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FrontPage() {
  const navigate = useNavigate();

  const handleSelection = (role) => {
    if (role === 'customer') {
      navigate('/login');
    } else if (role === 'admin') {
      navigate('/admin_Login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 font-inter px-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row transition-all duration-500">
        {/* Left Side */}
        <div className="flex-1 bg-gradient-to-br from-blue-100 to-indigo-200 p-10 flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome Back!</h2>
          <p className="text-gray-700 mb-8">If you're a valued customer, log in and manage your account with ease.</p>
          <button
            onClick={() => handleSelection('customer')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-xl"
          >
            👤 Customer Login
          </button>
        </div>

        {/* Right Side */}
        <div className="flex-1 bg-gradient-to-br from-green-100 to-emerald-200 p-10 flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Admin Panel</h2>
          <p className="text-gray-700 mb-8">Admins, log in to manage the system, users, and transactions securely.</p>
          <button
            onClick={() => handleSelection('admin')}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-xl"
          >
            🛡️ Admin Login
          </button>
        </div>
      </div>
    </div>
  );
}
