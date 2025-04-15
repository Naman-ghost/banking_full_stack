// UserDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineMail, MdOutlineContactPhone } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import { CiBank } from "react-icons/ci";

export default function UserDetails() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8081/mainpage/${userId}`)
      .then(res => setUserData(res.data))
      .catch(err => console.error('Failed to fetch user details', err));
  }, [userId]);

  return (
    <div className="container mt-5">
      <button onClick={() => navigate(-1)} className="btn btn-secondary mb-4">← Back</button>
      <div className="card shadow-lg p-4">
        <div className="text-center">
          <FaUserCircle size={80} className="text-primary mb-3" />
          <h3>{userData?.username}</h3>
        </div>
        <hr />
        {userData ? (
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
        ) : (
          <p className="text-muted text-center">Loading user details...</p>
        )}
      </div>
    </div>
  );
}
