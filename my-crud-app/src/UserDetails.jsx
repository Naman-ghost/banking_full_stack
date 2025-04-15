import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineMail, MdOutlineContactPhone } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import { CiBank } from "react-icons/ci";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UserDetails() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    axios.get(`http://localhost:8081/mainpage/${userId}`)
      .then(res => {
        setUserData(res.data);
        setMessage('');
      })
      .catch(err => {
        console.error('Failed to fetch user details', err);
        setMessage('Failed to load user data. Please try again later.');
      });
  }, [userId]);

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <div className="bg-dark text-white p-4" style={{ width: '250px' }}>
        <div className="d-flex align-items-center mb-4">
          <CiBank size={30} className="me-2" />
          <h4>FinBanker</h4>
        </div>
        <ul className="list-unstyled">
          <li><Link to={`/mainpage/${userId}`} className="text-white d-block mb-2">Dashboard</Link></li>
          <li><Link to={`/make-payment/${userId}`} className="text-white d-block mb-2">Payment</Link></li>
          <li><Link to={`/past-payment/${userId}`} className="text-white d-block mb-2">E-Statement</Link></li>
          <li><Link to={`/fds/${userId}`} className="text-white d-block mb-2">FD List</Link></li>
          <li><Link to={`/fixed-deposits/${userId}`} className="text-white d-block mb-2">Create FD</Link></li>
          <li><Link to={`/contact`} className="text-white d-block mb-2">Contact</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>User Details</h2>
          <button onClick={() => navigate(-1)} className="btn btn-secondary">
            ← Back
          </button>
        </div>

        {message && (
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        )}

        {/* User Data */}
        <div className="card shadow-lg p-4">
          {userData ? (
            <>
              <div className="text-center mb-4">
                <FaUserCircle size={80} className="text-primary mb-3" />
                <h3>{userData.username}</h3>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Full Name:</strong> {userData.first_name} {userData.last_name}</p>
                  <p><MdOutlineMail className="text-danger" /> <strong>Email:</strong> {userData.email}</p>
                  <p><MdOutlineContactPhone className="text-secondary" /> <strong>Phone:</strong> {userData.phone}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Address:</strong> {userData.address}, {userData.city}</p>
                  <p><strong>DOB:</strong> {new Date(userData.date_of_birth).toLocaleDateString()}</p>
                  <p><strong>Gender:</strong> {userData.gender}</p>
                  <p><IoWalletOutline className="text-success" /> <strong>Bank Balance:</strong> ₹{userData.bank_balance}</p>
                  <p><CiBank className="text-warning" /> <strong>Last Login:</strong> {userData.last_login || 'Never'}</p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-muted text-center">Loading user details...</p>
          )}
        </div>
      </div>
    </div>
  );
}
