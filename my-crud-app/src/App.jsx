import { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import Create from './Create';
import Read from './Read';
import Edit from './Edit';
import Login from './Login';
import Delete from './Delete';
import MainPage from './MainPage';
import MakePayments from './MakePayments';
import PastPayments from './PastPayments';
import FDs from './FDs';
import FixedDeposits from './FixedDeposits';
import ContactUs from './contact_us';
import FrontPage from './FrontPage'; // Import front page
import Admin_Login from './admin_Login';
import Admin_Customers from './admin_Customers';
import Admin_Dashboard from './admin_Dashboard';
import Admin_Transactions from './admin_Transactions';
import Admin_CustomerManagement from './CustomerManagement';
import UserDetails from './UserDetails';
import AdminAuthContext from './AdminAuthContext';
import AdminLayout from './AdminLayout';


import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  // const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return !!localStorage.getItem("adminToken"); // returns true if token exists
  });
  
  // Handle user login success
  const handleLoginSuccess = (id) => {
    setIsLoggedIn(true);
    setUserId(id);
  };

  // Handle admin logout
  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false); // Clear admin session
  };
  return (
    <BrowserRouter>
      <AdminAuthContext.Provider value={{ isAdminAuthenticated, setIsAdminAuthenticated }}>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/mainpage/:userId"
          element={isLoggedIn ? <MainPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/past-payment/:userId"
          element={isLoggedIn ? <PastPayments /> : <Navigate to="/login" />}
        />
        <Route
          path="/make-payment/:id"
          element={isLoggedIn ? <MakePayments /> : <Navigate to="/login" />}
        />
         <Route path="/user-details/:userId" element={<UserDetails />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/delete/:id" element={<Delete />} />
        <Route path="/fixed-deposits/:userId" element={<FixedDeposits />} />
        <Route path="/fds/:userId" element={<FDs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/admin_login" element={<Admin_Login />} />
          <Route
            path="/admin"
            element={isAdminAuthenticated ? <AdminLayout /> : <Navigate to="/admin_login" />}
          >
            <Route path="dashboard" element={<Admin_Dashboard />} />
            <Route path="customers" element={<Admin_Customers />} />
            <Route path="customer-management" element={<Admin_CustomerManagement />} />
            <Route path="transactions" element={<Admin_Transactions />} />
          </Route>
        </Routes>
      </AdminAuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
