import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [todayAmount, setTodayAmount] = useState(0);
  const [adminName, setAdminName] = useState(""); // State for admin name

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching the necessary data
        const [customersRes, transactionsRes, todayAmountRes] = await Promise.all([
          axios.get("http://localhost:8081/total-customers"),
          axios.get("http://localhost:8081/total-transactions"),
          axios.get("http://localhost:8081/today-transactions-amount"),
        ]);

        setTotalCustomers(customersRes.data.totalCustomers);
        setTotalTransactions(transactionsRes.data.totalTransactions);
        setTodayAmount(todayAmountRes.data.totalToday);
        
        // Fetch the admin name from localStorage
        const storedAdminName = localStorage.getItem("adminName");
        if (storedAdminName) {
          setAdminName(storedAdminName); // Set admin's name from localStorage
        }
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="ml-64 pt-5 p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Dashboard</h1>
      {/* Displaying the personalized greeting message */}
      <p className="text-xl font-medium text-gray-700 mb-8">
        Hi, <span className="font-bold text-blue-600">{adminName}</span> !
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Customers</h3>
          <p className="text-3xl font-bold text-blue-600">{totalCustomers}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Transactions</h3>
          <p className="text-3xl font-bold text-green-600">{totalTransactions}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Today's Transaction Amount</h3>
          <p className="text-3xl font-bold text-purple-600">₹{todayAmount}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;