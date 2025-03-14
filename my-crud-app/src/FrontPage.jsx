import React from 'react'

export default function FrontPage() {
    const [role, setRole] = useState(null);

    const handleLogin = (selectedRole) => {
      setRole(selectedRole);
      console.log(`Logging in as ${selectedRole}`);
    };
  
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-600">
        <div className="bg-white p-10 rounded-2xl shadow-2xl w-96 text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Welcome Back</h2>
          <p className="text-gray-500 mb-6">Select your role to continue</p>
          <button
            onClick={() => handleLogin("admin")}
            className="w-full bg-blue-600 text-white py-3 rounded-full mb-4 text-lg font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md"
          >
            Login as Administrator
          </button>
          <button
            onClick={() => handleLogin("user")}
            className="w-full bg-green-500 text-white py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-transform transform hover:scale-105 shadow-md"
          >
            Login as User
          </button>
        </div>
      </div>
    );
  }
  
