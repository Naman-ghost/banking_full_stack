import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AdminAuthContext from "./AdminAuthContext";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { setIsAdminAuthenticated } = useContext(AdminAuthContext);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    setIsAdminAuthenticated(false);
    navigate("/admin_login");
  };

  return (
    <div className="fixed top-0 left-64 right-0 z-50 bg-gradient-to-r from-indigo-600 to-blue-600 p-4 text-white flex justify-between items-center shadow-lg">
      {/* Welcome Text */}
      <div className="text-2xl font-semibold">
        Welcome to <span className="font-extrabold text-yellow-400">Finbanker</span>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 px-6 py-2 rounded hover:bg-red-600 transition-all duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminNavbar;