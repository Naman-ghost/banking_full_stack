import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { CiBank } from "react-icons/ci";
import { FaArrowLeft, FaCheck, FaUser, FaComments, FaCreditCard } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MakePayments() {
  const navigate = useNavigate();
  const { id: senderIdFromURL } = useParams();
  const [receiverId, setReceiverId] = useState("");
  const [confirmReceiverId, setConfirmReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("RTGS");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const warnBeforeUnload = (e) => {
      if (!isConfirming) {
        const msg = "Refreshing will cancel your transaction!";
        e.returnValue = msg;
        return msg;
      }
    };

    window.addEventListener("beforeunload", warnBeforeUnload);
    return () => window.removeEventListener("beforeunload", warnBeforeUnload);
  }, [isConfirming]);

  const handleMakePayment = async () => {
    // Check if the fields are valid
    if (!receiverId || !confirmReceiverId || !amount || !password) {
      setMessage("Please fill in all required fields.");
      return;
    }

    // Validate if receiver ID matches the confirmation
    if (receiverId !== confirmReceiverId) {
      setMessage("Receiver ID and confirmation do not match.");
      return;
    }

    // Ask for confirmation to proceed
    setIsConfirming(true);

    try {
      const response = await axios.post(
        `http://localhost:8081/make-payment/${senderIdFromURL}`,
        {
          receiverId,
          amount,
          method,
          description,
          password,
        }
      );

      // Check the response for password correctness
      if (response.data.success === false && response.data.error === 'Incorrect password') {
        setMessage("Incorrect password. Please try again.");
        setIsConfirming(false);
        return;
      }

      // If payment is successful
      setMessage(response.data.message || "Payment successful!");
    } catch (error) {
      console.error("Payment error:", error);
      setMessage(error.response?.data?.message || "An error occurred during the payment.");
    } finally {
      setIsConfirming(false);
    }
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
          <li><Link to={`/mainpage/${senderIdFromURL}`} className="text-white d-block mb-2">Dashboard</Link></li>
          <li><Link to={`/make-payment/${senderIdFromURL}`} className="text-white d-block mb-2 fw-bold">Payment</Link></li>
          <li><Link to={`/past-payment/${senderIdFromURL}`} className="text-white d-block mb-2">E-Statement</Link></li>
          <li><Link to={`/fds/${senderIdFromURL}`} className="text-white d-block mb-2">FD List</Link></li>
          <li><Link to={`/fixed-deposits/${senderIdFromURL}`} className="text-white d-block mb-2">Create FD</Link></li>
          <li><Link to={`/contact`} className="text-white d-block mb-2">Contact</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Make a Payment</h2>
          <button onClick={() => navigate('/login')} className="btn btn-danger">Logout</button>
        </div>

        <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
          {message && (
            <div className={`alert ${message.includes("success") ? "alert-success" : "alert-danger"}`} role="alert">
              {message}
            </div>
          )}

          <div className="mb-3">
            <label>Sender ID</label>
            <div className="input-group">
              <span className="input-group-text"><FaUser /></span>
              <input type="text" className="form-control" value={senderIdFromURL} disabled />
            </div>
          </div>

          {/* Receiver ID and Confirm Receiver ID */}
          <div className="row mb-3">
            <div className="col-6">
              <label>Receiver ID</label>
              <div className="input-group">
                <span className="input-group-text"><FaUser /></span>
                <input
                  type="text"
                  className="form-control"
                  value={receiverId}
                  onChange={(e) => setReceiverId(e.target.value)}
                  placeholder="Enter receiver's user ID"
                />
              </div>
            </div>
            <div className="col-6">
              <label>Confirm Receiver ID</label>
              <div className="input-group">
                <span className="input-group-text"><FaUser /></span>
                <input
                  type="text"
                  className="form-control"
                  value={confirmReceiverId}
                  onChange={(e) => setConfirmReceiverId(e.target.value)}
                  placeholder="Confirm receiver's user ID"
                />
              </div>
            </div>
          </div>

          {/* Amount */}
          <div className="mb-3">
            <label>Amount (₹)</label>
            <div className="input-group">
              <span className="input-group-text">₹</span>
              <input
                type="number"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-3">
            <label>Payment Method</label>
            <div className="input-group">
              <span className="input-group-text"><FaCreditCard /></span>
              <select
                className="form-select"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option value="RTGS">RTGS</option>
                <option value="NEFT">NEFT</option>
                <option value="UPI">UPI</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="mb-3">
            <label>Description (optional)</label>
            <div className="input-group">
              <span className="input-group-text"><FaComments /></span>
              <textarea
                className="form-control"
                rows="2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label>Password</label>
            <div className="input-group">
              <span className="input-group-text"><FaCreditCard /></span>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              <FaArrowLeft className="me-1" /> Back
            </button>
            <button
              className="btn btn-primary"
              onClick={handleMakePayment}
              disabled={isConfirming}
            >
              <FaCheck className="me-1" /> {isConfirming ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
