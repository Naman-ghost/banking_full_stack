import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PastPayments() {
  const { userId } = useParams(); // Get userId from URL
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
      .catch(error => {
        setError('Error fetching payments');
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return (
    <div>
      <p>{error}</p>
      <button onClick={() => navigate('/login')}>Go to Login</button>
    </div>
  );

  return (
    <div>
      <h2>Past Payments</h2>
      {payments.length === 0 ? (
        <p>No past payments found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Sender ID</th>
              <th>Receiver ID</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.payment_id}>
                <td>{payment.payment_id}</td>
                <td>{payment.sender_account_id}</td>
                <td>{payment.receiver_account_id}</td>
                <td>₹{payment.payment_amount}</td>
                <td>{payment.payment_method}</td>
                <td>{new Date(payment.payment_date).toLocaleDateString()}</td>
                <td>{payment.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
