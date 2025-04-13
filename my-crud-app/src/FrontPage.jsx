import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FrontPage() {
  const navigate = useNavigate();

  const handleSelection = (role) => {
    if (role === 'customer') {
      navigate('/login');
    } else if (role === 'admin') {
      navigate('/admin_login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-green-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome! Choose Your Role</h1>
        <div className="space-y-4">
          <button
            onClick={() => handleSelection('customer')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl w-full"
          >
            Customer
          </button>
          <button
            onClick={() => handleSelection('admin')}
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl w-full"
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}
