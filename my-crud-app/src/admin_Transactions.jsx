import { useEffect, useState } from "react";
import axios from "axios";

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/admin_transactions")
      .then((res) => {
        if (res.data.success) {
          setTransactions(res.data.transactions);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="ml-64 p-6">
      <h2 className="text-2xl font-bold mb-4">All Transactions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Sender</th>
              <th className="p-3">Receiver</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((t) => (
                <tr key={t.payment_id} className="border-b text-center">
                  <td className="p-3">{t.payment_id}</td>
                  <td className="p-3">{t.sender || "N/A"}</td>
                  <td className="p-3">{t.receiver || "N/A"}</td>
                  <td className="p-3 font-bold">₹{t.payment_amount}</td>
                  <td className="p-3">
                    {new Date(t.payment_date).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTransactions;