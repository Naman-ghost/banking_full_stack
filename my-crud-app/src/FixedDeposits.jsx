import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CiBank } from "react-icons/ci";
import { FaArrowLeft, FaCheckCircle, FaCalculator } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function FixedDeposits() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState(12); // in months
  const [interestRate, setInterestRate] = useState(0);
  const [interestEarned, setInterestEarned] = useState(0);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Hardcoded SBI FD interest slabs
  const getInterestRate = (months) => {
    if (months >= 1 && months <= 1.5) return 3.00;
    if (months > 1.5 && months < 6) return 4.50;
    if (months >= 6 && months <= 7) return 5.25;
    if (months > 7 && months < 12) return 5.75;
    if (months >= 12 && months < 24) return 6.80;
    if (months >= 24 && months < 36) return 7.00;
    if (months >= 36 && months < 60) return 7.25;
    if (months >= 60) return 7.50;
    return 0;
  };

  useEffect(() => {
    const rate = getInterestRate(parseInt(duration));
    setInterestRate(rate);
    if (amount && rate && duration) {
      const interest = (amount * rate * (duration / 12)) / 100;
      setInterestEarned(interest);
    }
  }, [amount, duration]);

  const handleCreateFD = () => {
    if (!userId) return setMessage("User not logged in.");
    if (!amount || amount <= 0) return setMessage("Amount must be greater than 0.");
    if (!duration || duration <= 0) return setMessage("Duration must be a positive number.");

    setIsLoading(true);
    setMessage("");

    const now = new Date();
    const maturity = new Date(now.setMonth(now.getMonth() + parseInt(duration)));
    const maturityDate = maturity.toISOString().slice(0, 19).replace("T", " ");

    axios
      .post(`http://localhost:8081/fixed-deposits`, {
        userId,
        amount,
        interestRate,
        maturityDate
      })
      .then(() => {
        setIsLoading(false);
        setMessage("FD Created Successfully!");
        setTimeout(() => navigate(`/fds/${userId}`), 2000);
      })
      .catch((error) => {
        setIsLoading(false);
        setMessage(error.response?.data?.error || "Error creating FD");
      });
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
          <li><Link to={`/fds/${userId}`} className="text-white d-block mb-2">FD List</Link></li>
          <li><Link to={`/fixed-deposits/${userId}`} className="text-white d-block mb-2 fw-bold">Create FD</Link></li>
          <li><Link to={`/contact`} className="text-white d-block mb-2">Contact</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Create a Fixed Deposit</h2>
          <button onClick={() => navigate('/login')} className="btn btn-danger">Logout</button>
        </div>

        <div className="mb-3">
          <button onClick={() => navigate(-1)} className="btn btn-secondary me-2">
            <FaArrowLeft className="me-2" />Back
          </button>
        </div>

        <div className="card p-4 shadow-sm" style={{ maxWidth: '600px' }}>
          {message && (
            <div className={`alert ${message.includes("Success") ? "alert-success" : "alert-danger"}`} role="alert">
              {message}
            </div>
          )}

          {/* Amount */}
          <div className="mb-3">
            <label>Amount (₹)</label>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter deposit amount"
            />
          </div>

          {/* Duration */}
          <div className="mb-3">
            <label>Duration (Months)</label>
            <input
              type="number"
              className="form-control"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 12"
            />
          </div>

          {/* Interest Rate (Readonly) */}
          <div className="mb-3">
            <label>Interest Rate (%)</label>
            <input
              type="text"
              className="form-control"
              value={interestRate}
              readOnly
            />
          </div>

          {/* Estimated Interest */}
          <div className="mb-3">
            <label>Estimated Interest Earned</label>
            <div className="input-group">
              <span className="input-group-text"><FaCalculator /></span>
              <input
                type="text"
                className="form-control"
                value={`₹${interestEarned.toFixed(2)}`}
                readOnly
              />
            </div>
          </div>

          <button
            className="btn btn-primary w-100"
            onClick={handleCreateFD}
            disabled={isLoading}
          >
            <FaCheckCircle className="me-2" />
            {isLoading ? "Creating FD..." : "Create FD"}
          </button>
        </div>
      </div>
    </div>
  );
}
