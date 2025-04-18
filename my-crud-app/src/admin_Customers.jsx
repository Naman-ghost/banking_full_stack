import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Customers = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const res = await axios.get("http://localhost:8081/admin_customers");
            setCustomers(res.data);
        } catch (error) {
            toast.error("Failed to fetch customers.");
        }
    };

    // Function to delete a customer
    const handleDeleteCustomer = async (id) => {
        if (!window.confirm("Are you sure you want to delete this customer?")) return;
        try {
            await axios.delete(`http://localhost:8081/admin_customers/${id}`);
            toast.success("Customer deleted successfully!");
            
            // Remove customer from UI
            setCustomers((prevCustomers) => prevCustomers.filter((cust) => cust.id !== id));
        } catch (error) {
            toast.error("Failed to delete customer.");
        }
    };

    return (
        <div className="ml-64 p-6">
            <h2 className="text-xl font-bold mb-4">Customer List</h2>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="py-3 px-6 text-left">ID</th>
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Email</th>
                        <th className="py-3 px-6 text-left">Balance</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.length > 0 ? (
                        customers.map((cust) => (
                            <tr key={cust.id} className="border-b hover:bg-gray-100">
                                <td className="py-3 px-6">{cust.id}</td>
                                <td className="py-3 px-6">{cust.username}</td>
                                <td className="py-3 px-6">{cust.email}</td>
                                <td className="py-3 px-6">₹{cust.bank_balance}</td>
                                <td className="py-3 px-6 text-center">
                                    <button
                                        onClick={() => handleDeleteCustomer(cust.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="py-3 px-6 text-center text-gray-500">
                                No customers found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Customers;