import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CiBank } from "react-icons/ci";
import { FaArrowLeft, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function FDs() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [fds, setFDs] = useState([]);
  const [message, setMessage] = useState("");
  const [penaltyInfo, setPenaltyInfo] = useState(null); // To store penalty and refund
  const [isLogoutRequested, setIsLogoutRequested] = useState(false); // To handle logout request

  // Fetch FDs
  useEffect(() => {
    if (!userId) return console.error("No userId found in URL!");
    axios
      .get(`http://localhost:8081/fds/${userId}`)
      .then((response) => setFDs(response.data))
      .catch((error) => console.error("Error fetching FDs:", error));

    // Prevent page refresh
    const handleBeforeUnload = (event) => {
      // Display confirmation dialog before refreshing or leaving the page
      event.preventDefault();
      event.returnValue = ''; // Chrome requires returnValue to be set
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [userId]);

  // Break FD Handler
  const handleBreakFD = (fdId) => {
    if (!window.confirm("Are you sure you want to break this FD?")) return;

    axios
      .post(`http://localhost:8081/fds/break/${userId}/${fdId}`)
      .then((response) => {
        const { message, penaltyAmount, refundAmount } = response.data;
        setMessage(message);
        setPenaltyInfo({ penaltyAmount, refundAmount });

        // Update the FD status in state without refreshing the page
        setFDs((prevFDs) =>
          prevFDs.map((fd) =>
            fd.fd_id === fdId ? { ...fd, status: "Closed" } : fd
          )
        );
      })
      .catch((error) => {
        console.error("Error breaking FD:", error);
        setMessage(error.response?.data?.error || "Error breaking FD");
        setPenaltyInfo(null); // Clear penalty info on error
      });
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLogoutRequested(true);
    navigate("/login");  // Redirect to login page
  };

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <div className="bg-dark text-white p-4" style={{ width: '250px' }}>
        <div className="d-flex align-items-center mb-4">
          <CiBank size={30} className="me-2" />
          <h4>FinBanker</h4>
        </div>
        <ul className="list-unstyled">
          <li><Link to={`/mainpage/${userId}`} className="text-white d-block mb-2">Dashboard</Link></li>
          <li><Link to={`/make-payment/${userId}`} className="text-white d-block mb-2">Payment</Link></li>
          <li><Link to={`/past-payment/${userId}`} className="text-white d-block mb-2">E-Statement</Link></li>
          <li><Link to={`/fds/${userId}`} className="text-white d-block mb-2 fw-bold">FD List</Link></li>
          <li><Link to={`/fixed-deposits/${userId}`} className="text-white d-block mb-2">Create FD</Link></li>
          <li><Link to={`/contact`} className="text-white d-block mb-2">Contact</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Your Fixed Deposits</h2>
          <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </div>

        <div className="mb-3">
          <button onClick={() => navigate(-1)} className="btn btn-secondary me-2">
            <FaArrowLeft className="me-2" />Back
          </button>
          <Link to={`/fixed-deposits/${userId}`} className="btn btn-success">
            <FaPlusCircle className="me-2" />Create New FD
          </Link>
        </div>

        {message && (
          <div className={`alert ${message.includes("successfully") ? "alert-success" : "alert-danger"}`} role="alert">
            {message}
            {penaltyInfo && (
              <>
                <br />
                <strong>Penalty:</strong> ₹{penaltyInfo.penaltyAmount.toFixed(2)}<br />
                <strong>Refunded:</strong> ₹{penaltyInfo.refundAmount.toFixed(2)}
              </>
            )}
            {isLogoutRequested && (
              <div className="mt-2">
                <strong>You have logged out successfully.</strong>
              </div>
            )}
          </div>
        )}

        <div className="card p-4 shadow-sm">
          {fds.length === 0 ? (
            <p className="text-muted text-center">No Fixed Deposits found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered text-center align-middle">
                <thead className="table-light">
                  <tr>
                    <th>FD ID</th>
                    <th>Amount</th>
                    <th>Interest Rate</th>
                    <th>Start Date</th>
                    <th>Maturity Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fds.map((fd) => (
                    <tr key={fd.fd_id}>
                      <td>{fd.fd_id}</td>
                      <td className="fw-bold text-success">₹{fd.amount}</td>
                      <td>{fd.interest_rate}%</td>
                      <td>{new Date(fd.start_date).toLocaleDateString()}</td>
                      <td>{new Date(fd.maturity_date).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge ${fd.status === "Closed" ? "bg-secondary" : "bg-success"}`}>
                          {fd.status}
                        </span>
                      </td>
                      <td>
                        {fd.status === "Active" ? (
                          <button
                            onClick={() => handleBreakFD(fd.fd_id)}
                            className="btn btn-outline-danger btn-sm"
                          >
                            <FaTrashAlt className="me-1" /> Break FD
                          </button>
                        ) : (
                          <span className="text-muted">N/A</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
