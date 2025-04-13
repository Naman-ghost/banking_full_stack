import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = ({ setIsAuthenticated }) => {
    const [admin, setAdmin] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Login clicked", admin);

        if (admin.email === "admin@gmail.com" && admin.password === "12345678") {
            toast.success("Login Successful!");
            setIsAuthenticated(true);
            navigate("/admin_dashboard");
        } else {
            toast.error("Invalid email or password.");
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        toast.info("Logged out successfully.");
        navigate("/");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
                Logout
            </button>

            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Admin Login</h2>

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={admin.email}
                            onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={admin.password}
                            onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
