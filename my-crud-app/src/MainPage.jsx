import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CiBank } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineContactPhone } from "react-icons/md";
import { IoReceiptOutline } from "react-icons/io5";
const MainPage = () => {
  const { userId } = useParams();  
  const [userData, setUserData] = useState(null);
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
  }, [userId]);
  return (
    <div className="d-flex">
      <div className="sidebar bg-blue-950 shadow-2xl text-white p-4" style={{ height: '100vh', width: '250px' }}>
        <div className="d-flex justify-content-start align-items-center mb-4">
          <CiBank size={40} className="mr-2" />
          <h4>Bank</h4>
        </div>
        <ul className="list-unstyled">
          <li><Link to="/" className="text-white">Dashboard</Link></li>
          <li><Link to="/create" className="text-white">Payment</Link></li>
          <li><Link to="/contact" className="text-white">Contact Us</Link></li>
          <li><Link to={`/past-payment/${userId}`} className="text-white">E-Statement</Link></li>
          <li><Link to= {`/Home`}className="text-white">Add benefinciary</Link></li>
          <li><Link to={`/fds/${userId}`} className="text-white">Fixed Deposits</Link></li>
          <li><Link to={`/fixed-deposits/${userId}`} className="text-white">Create FD</Link></li>
        </ul>
      </div>
      <div className="flex-grow-1">
        <div className="py-5 shadow-sm flex text-center p-4 ml-4 items-center ">
          <h1 className="display-4 text-primary mr-6">User Information</h1>
          <div className="flex space-x-6 ml-auto">
            <div className='flex items-center space-x-2'> <CiBank /><span>Home</span></div>
            <div className='flex items-center space-x-2'><MdOutlineContactPhone /><span>Contact Us</span></div>
            <div className='flex items-center space-x-2'><IoReceiptOutline /><span>E-Statement</span></div>
          </div>
        </div>
        <div className="container d-flex align-items-center justify-content-center mt-5">
          <div className="card shadow-lg p-4 w-50">
            <div className="card-body text-center">
              <FaUserCircle size={80} className="text-primary mb-3" />
              <h2 className="card-title">{userData ? userData.username : 'Loading...'}</h2>
              <hr />
              {userData ? (
                <div className="text-left">
                  <p><MdOutlineMail className="text-danger" /> <strong>Email:</strong> {userData.email}</p>
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
