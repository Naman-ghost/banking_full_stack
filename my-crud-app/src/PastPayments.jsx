import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      .catch(error => {
        setError('Error fetching payments');
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  if (error) return (
    <div className="flex flex-col items-center justify-center h-60">
      <p className="text-red-600 font-semibold">{error}</p>
      <button 
        onClick={() => navigate('/login')} 
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Login
      </button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Past Payments</h2>
      {payments.length === 0 ? (
        <p className="text-center text-gray-500">No past payments found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-4 py-2 border">Transaction ID</th>
                <th className="px-4 py-2 border">Sender ID</th>
                <th className="px-4 py-2 border">Receiver ID</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Method</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Description</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.payment_id} className="text-center border-b hover:bg-gray-50">
                  <td className="px-4 py-2 border">{payment.payment_id}</td>
                  <td className="px-4 py-2 border">{payment.sender_account_id}</td>
                  <td className="px-4 py-2 border">{payment.receiver_account_id}</td>
                  <td className="px-4 py-2 border font-medium text-green-600">₹{payment.payment_amount}</td>
                  <td className="px-4 py-2 border">{payment.payment_method}</td>
                  <td className="px-4 py-2 border">{new Date(payment.payment_date).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border">{payment.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
