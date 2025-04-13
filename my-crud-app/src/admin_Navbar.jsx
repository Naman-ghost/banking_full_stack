import { useNavigate } from 'react-router-dom';

function Navbar({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false); // You can set authentication state to false
    navigate('/admin_Login'); // Navigate to the login page (or wherever you want to go)
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-end ml-64">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
