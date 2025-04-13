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
import Admin_login from './admin_Login';
import Admin_Customers from './admin_Customers';
import Admin_Dashboard from './admin_Dashboard';
import Admin_Transactions from './admin_Transactions';
import Admin_CustomerManagement from './CustomerManagement';


import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleLoginSuccess = (id) => {
    setIsLoggedIn(true);
    setUserId(id);
  };

  return (
    <BrowserRouter>
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
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/delete/:id" element={<Delete />} />
        <Route path="/fixed-deposits/:userId" element={<FixedDeposits />} />
        <Route path="/fds/:userId" element={<FDs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/admin_login" element={<Admin_login setIsAuthenticated={setIsAdminAuthenticated}/>} />
        <Route path="/admin_dashboard" element={<Admin_Dashboard setIsAuthenticated={setIsAdminAuthenticated}/>} />
        <Route path="/admin_customers" element={<Admin_Customers />} />
        <Route path="/admin_customer-management" element={<Admin_CustomerManagement />} />
        <Route path="/admin_transactions" element={<Admin_Transactions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
