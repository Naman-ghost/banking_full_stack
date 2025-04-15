import { Outlet } from "react-router-dom";
import AdminNavbar from "./admin_Navbar";
import AdminSidebar from "./admin_Sidebar";
import { useContext } from "react";
import AdminAuthContext from "./AdminAuthContext";

const AdminLayout = () => {
  const { isAdminAuthenticated } = useContext(AdminAuthContext);

  return (
    <div className="flex">
      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-40">
        <AdminSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-1">
        {/* Fixed Navbar */}
        <AdminNavbar />

        {/* Content below Navbar */}
        <div className="pt-20 p-6 bg-gray-100 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;