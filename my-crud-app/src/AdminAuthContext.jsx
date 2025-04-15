import { createContext, useState } from "react";

// Create a context for admin authentication
const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  return (
    <AdminAuthContext.Provider value={{ isAdminAuthenticated, setIsAdminAuthenticated }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthContext;