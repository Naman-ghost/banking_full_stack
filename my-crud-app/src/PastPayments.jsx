import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { CiBank } from 'react-icons/ci';
import { FaArrowLeft, FaCreditCard, FaCheckCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PastPayments() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError('User not logged in');
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:8081/past-payments/${userId}`)
      .then(response => {
        setPayments(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching payments');
        setLoading(false);
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
          <li><Link to={`/past-payment/${userId}`} className="text-white d-block mb-2 fw-bold">E-Statement</Link></li>
          <li><Link to={`/fds/${userId}`} className="text-white d-block mb-2">FD List</Link></li>
          <li><Link to={`/fixed-deposits/${userId}`} className="text-white d-block mb-2">Create FD</Link></li>
          <li><Link to={`/contact`} className="text-white d-block mb-2">Contact</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Past Payments</h2>
          <button onClick={() => navigate('/login')} className="btn btn-danger">Logout</button>
        </div>

        {/* Loading and Error States */}
        {loading && <p className="text-center text-muted">Loading...</p>}
        {error && (
          <div className="alert alert-danger d-flex justify-content-between align-items-center">
            {error}
            <button className="btn btn-sm btn-primary" onClick={() => navigate('/login')}>Go to Login</button>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="card shadow-sm p-4">
            {payments.length === 0 ? (
              <p className="text-center text-muted">No past payments found.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered text-center align-middle">
                  <thead className="table-light">
                    <tr>
                      <th><FaCheckCircle className="me-1 text-success" />Txn ID</th>
                      <th>Sender</th>
                      <th>Receiver</th>
                      <th>Amount (₹)</th>
                      <th>Method</th>
                      <th>Date</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map(payment => (
                      <tr key={payment.payment_id}>
                        <td>{payment.payment_id}</td>
                        <td>{payment.sender_account_id}</td>
                        <td>{payment.receiver_account_id}</td>
                        <td className="fw-bold text-success">₹{payment.payment_amount}</td>
                        <td>{payment.payment_method}</td>
                        <td>{new Date(payment.payment_date).toLocaleDateString()}</td>
                        <td>{payment.description || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="d-flex justify-content-start mt-3">
              <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                <FaArrowLeft className="me-2" />Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
