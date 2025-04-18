// import { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const CustomerManagement = () => {
//     const [customers, setCustomers] = useState([]);
//     const [newCustomer, setNewCustomer] = useState({ username: "", email: "", password: "" });
//     const [deposit, setDeposit] = useState({ customerId: "", amount: "" });

//     useEffect(() => {
//         fetchCustomers();
//     }, []);

//     const fetchCustomers = async () => {
//         try {
//             const res = await axios.get("http://localhost:8081/customers");
//             setCustomers(res.data);
//         } catch (error) {
//             toast.error("Failed to fetch customers.");
//         }
//     };

//     const handleAddCustomer = async () => {
//         if (!newCustomer.username || !newCustomer.email || !newCustomer.password) {
//             toast.warning("Please enter name, email, and password.");
//             return;
//         }

//         try {
//             const res = await axios.post("http://localhost:8081/add-customer", newCustomer);
//             toast.success("Customer added successfully!");
//             setCustomers([...customers, { id: res.data.customerId, ...newCustomer }]);
//             setNewCustomer({ username: "", email: "", password: "" });
//         } catch (error) {
//             toast.error("Failed to add customer.");
//         }
//     };

//     const handleDeposit = async () => {
//         if (!deposit.customerId || !deposit.amount || deposit.amount <= 0) {
//             toast.warning("Enter a valid customer ID and amount.");
//             return;
//         }

//         try {
//             await axios.post("http://localhost:8081/deposit", deposit);
//             toast.success("Deposit successful!");
//             setDeposit({ customerId: "", amount: "" });
//         } catch (error) {
//             toast.error("Deposit failed.");
//         }
//     };

//     return (
//         <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
//             <h2 className="text-3xl font-bold mb-6 text-blue-700">Customer Management</h2>

//             {/* Add Customer Section */}
//             <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-3xl">
//                 <h3 className="text-xl font-semibold mb-4 text-gray-700">Add New Customer</h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                     <input
//                         type="text"
//                         placeholder="Name"
//                         value={newCustomer.username}
//                         onChange={(e) => setNewCustomer({ ...newCustomer, username: e.target.value })}
//                         className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-400"
//                     />
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         value={newCustomer.email}
//                         onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
//                         className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-400"
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={newCustomer.password}
//                         onChange={(e) => setNewCustomer({ ...newCustomer, password: e.target.value })}
//                         className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-400"
//                     />
//                 </div>
//                 <button
//                     onClick={handleAddCustomer}
//                     className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
//                 >
//                     Add Customer
//                 </button>
//             </div>

//             {/* Deposit Section */}
//             <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
//                 <h3 className="text-xl font-semibold mb-4 text-gray-700">Deposit Money</h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <input
//                         type="number"
//                         placeholder="Customer ID"
//                         value={deposit.customerId}
//                         onChange={(e) => setDeposit({ ...deposit, customerId: e.target.value })}
//                         className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-400"
//                     />
//                     <input
//                         type="number"
//                         placeholder="Amount"
//                         value={deposit.amount}
//                         onChange={(e) => setDeposit({ ...deposit, amount: e.target.value })}
//                         className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-400"
//                     />
//                 </div>
//                 <button
//                     onClick={handleDeposit}
//                     className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
//                 >
//                     Deposit Money
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default CustomerManagement;

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CustomerManagement = () => {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        phone: "",
        address: "",
        city: "",
        date_of_birth: "",
        gender: "Male",
    });
    const [deposit, setDeposit] = useState({ customerId: "", amount: "" });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const res = await axios.get("http://localhost:8081/customers");
            setCustomers(res.data);
        } catch (error) {
            toast.error("Failed to fetch customers.");
        }
    };

    const getMaxDOB = () => {
        const today = new Date();
        today.setFullYear(today.getFullYear() - 0); 
        return today.toISOString().split("T")[0];
    };

    const handleAddCustomer = async () => {
        const {
            username, email, password,
            first_name, last_name, phone, address, city, date_of_birth, gender
        } = newCustomer;

        if (!username || !email || !password || !first_name || !last_name || !phone || !address || !city || !date_of_birth) {
            toast.warning("Please fill all fields.");
            return;
        }

        // Age validation: Must be at least 4 years old
        const dob = new Date(date_of_birth);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        if (age < 0) {
            toast.error("Customer must exist in real life.");
            return;
        }

        try {
            const res = await axios.post("http://localhost:8081/add-customer", newCustomer);
            toast.success("Customer added successfully!");
            setCustomers([...customers, { id: res.data.customerId, ...newCustomer }]);
            setNewCustomer({
                username: "", email: "", password: "",
                first_name: "", last_name: "", phone: "",
                address: "", city: "", date_of_birth: "", gender: "Male"
            });
        } catch (error) {
            toast.error("Failed to add customer.");
        }
    };

    const handleDeposit = async () => {
        if (!deposit.customerId || !deposit.amount || deposit.amount <= 0) {
            toast.warning("Enter a valid customer ID and amount.");
            return;
        }

        try {
            await axios.post("http://localhost:8081/deposit", deposit);
            toast.success("Deposit successful!");
            setDeposit({ customerId: "", amount: "" });
        } catch (error) {
            toast.error("Deposit failed.");
        }
    };

    return (
        <div className="ml-64 bg-gradient-to-tr from-blue-50 to-white min-h-screen py-10 px-4 sm:px-10">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-10">
                    Customer Management Dashboard
                </h1>

                {/* Add Customer */}
                <div className="bg-white rounded-2xl shadow-md p-8 mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">🧾 Add New Customer</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { label: "Username", key: "username", type: "text" },
                            { label: "Email", key: "email", type: "email" },
                            { label: "Password", key: "password", type: "password" },
                            { label: "First Name", key: "first_name", type: "text" },
                            { label: "Last Name", key: "last_name", type: "text" },
                            { label: "Phone", key: "phone", type: "text" },
                            { label: "Address", key: "address", type: "text" },
                            { label: "City", key: "city", type: "text" },
                        ].map(({ label, key, type }) => (
                            <div key={key}>
                                <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
                                <input
                                    type={type}
                                    value={newCustomer[key]}
                                    onChange={(e) => setNewCustomer({ ...newCustomer, [key]: e.target.value })}
                                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                        ))}

                        {/* Date of Birth with Age Constraint */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Date of Birth</label>
                            <input
                                type="date"
                                value={newCustomer.date_of_birth}
                                onChange={(e) => setNewCustomer({ ...newCustomer, date_of_birth: e.target.value })}
                                max={getMaxDOB()}
                                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
                            <select
                                value={newCustomer.gender}
                                onChange={(e) => setNewCustomer({ ...newCustomer, gender: e.target.value })}
                                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6 text-right">
                        <button
                            onClick={handleAddCustomer}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Add Customer
                        </button>
                    </div>
                </div>

                {/* Deposit Money */}
                <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">💸 Deposit Money</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Customer ID</label>
                            <input
                                type="number"
                                placeholder="Enter customer ID"
                                value={deposit.customerId}
                                onChange={(e) => setDeposit({ ...deposit, customerId: e.target.value })}
                                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Amount</label>
                            <input
                                type="number"
                                placeholder="Enter amount"
                                value={deposit.amount}
                                onChange={(e) => setDeposit({ ...deposit, amount: e.target.value })}
                                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                    </div>

                    <div className="mt-6 text-right">
                        <button
                            onClick={handleDeposit}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                        >
                            Deposit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerManagement;