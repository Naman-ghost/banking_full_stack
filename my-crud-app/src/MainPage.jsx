import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CiBank } from "react-icons/ci";
import { MdOutlineMail, MdOutlineContactPhone } from "react-icons/md";
import { IoWalletOutline, IoReceiptOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

const MainPage = () => {
  const { userId } = useParams();  
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User ID received:", userId);
    if (userId) {
      axios.get(`http://localhost:8081/mainpage/${userId}`)
        .then((response) => {
          console.log("User data received:", response.data);
          setUserData(response.data);
        })
        .catch((error) => console.error('Error fetching user data:', error));
    } else {
      console.error('User ID is undefined!');
    }

    // Add event listener for beforeunload to warn user before refresh
    const handleBeforeUnload = (event) => {
      const message = "Page is refreshing which is not allowed. You will be logged out if you proceed.";
      event.returnValue = message; // Standard for most browsers
      return message; // Some browsers require this as well for confirmation
    };

    // Attach the beforeunload event
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [userId]);

  // Logout function
  const handleLogout = () => {
    // Optionally, clear authentication state or token here if needed
    navigate('/login');
  };

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <div className="sidebar bg-blue-950 shadow-2xl text-white p-4" style={{ width: '250px' }}>
        <div className="d-flex justify-content-start align-items-center mb-4">
          <CiBank size={40} className="mr-2" />
          <h4>Bank</h4>
        </div>
        <ul className="list-unstyled">
          <li><Link to="/" className="text-white">Dashboard</Link></li>
          <li><Link to={`/make-payment/${userId}`} className="text-white">Payment</Link></li>
          <li><Link to="/contact" className="text-white">Contact Us</Link></li>
          <li><Link to={`/past-payment/${userId}`} className="text-white">E-Statement</Link></li>
          <li><Link to={`/fds/${userId}`} className="text-white">Fixed Deposits</Link></li>
          <li><Link to={`/fixed-deposits/${userId}`} className="text-white">Create FD</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Top Navbar with Logout Button */}
        <div className="d-flex justify-content-between p-4 bg-light shadow-sm">
          <div className="d-flex align-items-center">
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </div>
          <div className="d-flex space-x-6">
            <div className='d-flex align-items-center space-x-2'> <CiBank /><span>Home</span></div>
            <div className='d-flex align-items-center space-x-2'><MdOutlineContactPhone /><span>Contact Us</span></div>
            <div className='d-flex align-items-center space-x-2'><IoReceiptOutline /><span>E-Statement</span></div>
          </div>
        </div>

        <div className="py-5 shadow-sm flex text-center p-4 ml-4 items-center">
          <h1 className="display-4 text-primary mr-6">User Information</h1>
        </div>

        <div className="container d-flex align-items-center justify-content-center mt-5">
          <div className="card shadow-lg p-4 w-50">
            <div className="card-body text-center">
              <FaUserCircle size={80} className="text-primary mb-3" />
              <h2 className="card-title">{userData ? userData.username : 'Loading...'}</h2>
              <hr />
              {userData ? (
                <div className="text-left">
                  <p><strong>Full Name:</strong> {userData.first_name} {userData.last_name}</p>
                  <p><MdOutlineMail className="text-danger" /> <strong>Email:</strong> {userData.email}</p>
                  <p><MdOutlineContactPhone className="text-secondary" /> <strong>Phone:</strong> {userData.phone}</p>
                  <p><strong>Address:</strong> {userData.address}, {userData.city}</p>
                  <p><strong>Date of Birth:</strong> {new Date(userData.date_of_birth).toLocaleDateString()}</p>
                  <p><strong>Gender:</strong> {userData.gender}</p>
                  <p><IoWalletOutline className="text-success" /> <strong>Bank Balance:</strong> ₹{userData.bank_balance}</p>
                  <p><CiBank className="text-warning" /> <strong>Last Login:</strong> {userData.last_login || 'Never'}</p>
                  <div className="d-flex justify-content-between mt-4">
                    <Link to="/" className="btn btn-primary">Dashboard</Link>
                    <Link to={`/make-payment/${userId}`} className="btn btn-success">Make Payment</Link>
                    <Link to="/contact" className="btn btn-info">Contact Us</Link>
                  </div>
                </div>
              ) : (
                <p className="text-muted">Fetching user data...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
