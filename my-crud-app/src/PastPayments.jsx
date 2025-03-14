import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PastPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('userId'); // Assuming user ID is stored in localStorage

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
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Past Payments</h2>
      {payments.length === 0 ? (
        <p>No past payments found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Receiver ID</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
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
