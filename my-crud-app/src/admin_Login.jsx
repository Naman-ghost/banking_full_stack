import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AdminAuthContext from "./AdminAuthContext";

const AdminLogin = () => {
  const [admin, setAdmin] = useState({ email: "", password: "" });
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", password: "" });
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();
  const { setIsAdminAuthenticated } = useContext(AdminAuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8081/admin-login", admin);
      const { token, admin: adminData } = res.data;

      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminName", adminData.name);

      toast.success("Login Successful!");
      setIsAdminAuthenticated(true);
      navigate("/admin/dashboard");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Invalid login credentials";
      toast.error(errorMessage);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/create-admin", newAdmin);
      toast.success("Admin created! You can now log in.");
      setShowRegister(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Admin creation failed");
    }
  };

  const handleLogout = () => {
    toast.info("Logged out successfully.");
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          {showRegister ? "Create Admin" : "Admin Login"}
        </h2>

        {/* Login Form */}
        {!showRegister ? (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600 mb-2">Email</label>
              <input
                type="email"
                value={admin.email}
                onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-600 mb-2">Password</label>
              <input
                type="password"
                value={admin.password}
                onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition duration-300"
            >
              Login
            </button>
          </form>
        ) : (
          // Register Form
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600 mb-2">Name</label>
              <input
                type="text"
                value={newAdmin.name}
                onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Full name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600 mb-2">Email</label>
              <input
                type="email"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Email address"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-600 mb-2">Password</label>
              <input
                type="password"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Create Admin
            </button>
          </form>
        )}

        {/* Toggle Register/Login */}
        <p className="text-center mt-4 text-sm text-gray-600">
          {showRegister ? "Already have an account?" : "Want to create an admin?"}{" "}
          <span
            onClick={() => setShowRegister(!showRegister)}
            className="text-indigo-600 hover:underline cursor-pointer"
          >
            {showRegister ? "Login here" : "Click here"}
          </span>
        </p>

        {/* Logout button */}
        <div className="mt-4">
          <button
            onClick={handleLogout}
            className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            MAINPAGE
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;