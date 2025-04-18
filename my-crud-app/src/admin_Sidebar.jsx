import { useNavigate, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaUser, FaUserCog, FaHandshake } from "react-icons/fa"; // Icons for the sidebar

const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
  { name: "Customers", path: "/admin/customers", icon: <FaUser /> },
  { name: "Customer Management", path: "/admin/customer-management", icon: <FaUserCog /> },
  { name: "Transactions", path: "/admin/transactions", icon: <FaHandshake /> },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="w-64 bg-blue-900 text-white h-screen fixed top-0 left-0 overflow-y-auto shadow-lg">
      <div className="p-5 sticky top-0 bg-blue-900 z-10 border-b border-blue-800">
        <h2 className="text-2xl font-extrabold tracking-wide">Admin Panel</h2>
      </div>

      <ul className="p-5 space-y-3">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={item.name}>
              <button
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg w-full text-left transition-all duration-300 ease-in-out ${
                  isActive
                    ? "bg-blue-800 text-white font-semibold shadow-lg"
                    : "hover:bg-blue-600 hover:text-white hover:font-medium"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full ${isActive ? "bg-blue-400" : "bg-blue-600"}`}
                >
                  {item.icon}
                </span>
                <span className={`flex-1 ${isActive ? "text-white" : "text-blue-100"}`}>{item.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminSidebar;