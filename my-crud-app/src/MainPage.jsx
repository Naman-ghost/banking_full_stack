// MainPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CiBank } from "react-icons/ci";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MainPage() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8081/mainpage/${userId}`)
        .then(res => setUserData(res.data))
        .catch(err => console.error(err));
    }

    const warnBeforeUnload = (e) => {
      const msg = "Refreshing will log you out!";
      e.returnValue = msg;
      return msg;
    };

    window.addEventListener('beforeunload', warnBeforeUnload);
    return () => window.removeEventListener('beforeunload', warnBeforeUnload);
  }, [userId]);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <div className="bg-dark text-white p-4" style={{ width: '250px' }}>
        <div className="d-flex align-items-center mb-4">
          <CiBank size={30} className="me-2" />
          <h4>FinBanker</h4>
        </div>
        <ul className="list-unstyled">
          <li><Link to={`/main/${userId}`} className="text-white d-block mb-2">Dashboard</Link></li>
          <li><Link to={`/make-payment/${userId}`} className="text-white d-block mb-2">Payment</Link></li>
          <li><Link to={`/past-payment/${userId}`} className="text-white d-block mb-2">E-Statement</Link></li>
          <li><Link to={`/fds/${userId}`} className="text-white d-block mb-2">FD List</Link></li>
          <li><Link to={`/fixed-deposits/${userId}`} className="text-white d-block mb-2">Create FD</Link></li>
          <li><Link to={`/contact`} className="text-white d-block mb-2">Contact</Link></li>
        </ul>
      </div>

      {/* Main Area */}
      <div className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Welcome, {userData?.username || 'User'}!</h2>
          <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </div>

        <div className="card p-4 shadow-sm">
          <h4>Quick Access</h4>
          <div className="d-flex gap-3 flex-wrap mt-3">
            <Link to={`/user-details/${userId}`} className="btn btn-outline-primary">View Profile Info</Link>
            <Link to={`/make-payment/${userId}`} className="btn btn-outline-success">Make a Payment</Link>
            <Link to={`/past-payment/${userId}`} className="btn btn-outline-info">View E-Statements</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
