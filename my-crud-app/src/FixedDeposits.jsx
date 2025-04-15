import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function FixedDeposits() {
  const { userId } = useParams(); 
  const navigate = useNavigate();  // Initialize navigate

  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState(5.0);
  const [duration, setDuration] = useState(12);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [interestEarned, setInterestEarned] = useState(0);

  const calculateInterest = () => {
    if (amount && interestRate && duration) {
      const interest = (amount * interestRate * (duration / 12)) / 100;
      setInterestEarned(interest);
    }
  };

  useEffect(() => {
    calculateInterest();
  }, [amount, interestRate, duration]);

  const handleCreateFD = () => {
    if (!userId) {
      setMessage("User not logged in.");
      return;
    }
    if (!amount || amount <= 0) {
      setMessage("Amount must be greater than 0.");
      return;
    }
    if (!duration || duration <= 0) {
      setMessage("Duration must be a positive number.");
      return;
    }

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
      .then((response) => {
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
    <div className="container mt-5">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary mb-3"
      >
        ← Back
      </button>

      <h2>Create a Fixed Deposit</h2>

      {message && (
        <p className={`mt-3 ${message.includes("Successfully") ? "text-success" : "text-danger"}`}>
          {message}
        </p>
      )}

      <div className="mb-3">
        <label>Amount (₹)</label>
        <input
          type="number"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Duration (Months)</label>
        <input
          type="number"
          className="form-control"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Interest Rate (%)</label>
        <input
          type="number"
          className="form-control"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Interest Earned (₹)</label>
        <input
          type="number"
          className="form-control"
          value={interestEarned.toFixed(2)}
          readOnly
        />
      </div>

      <button
        className="btn btn-primary"
        onClick={handleCreateFD}
        disabled={isLoading}
      >
        {isLoading ? "Creating FD..." : "Create FD"}
      </button>
    </div>
  );
}
