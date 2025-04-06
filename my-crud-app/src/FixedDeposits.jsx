import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function FixedDeposits() {
  const { userId } = useParams(); // ✅ Get userId from URL
  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState(5.0);
  const [duration, setDuration] = useState(12);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleCreateFD = () => {
    if (!userId) {
      setMessage("User not logged in.");
      return;
    }
    if (!amount || amount <= 0) {
      setMessage("Invalid amount.");
      return;
    }

    axios
      .post(`http://localhost:8081/fixed-deposits`, { userId, amount, interestRate, duration })
      .then((response) => {
        setMessage("FD Created Successfully!");
        setTimeout(() => navigate(`/fds/${userId}`), 2000);
      })
      .catch((error) => {
        setMessage(error.response?.data || "Error creating FD");
      });
  };

  return (
    <div className="container mt-5">
      <h2>Create a Fixed Deposit</h2>
      {message && <p className="mt-3 text-danger">{message}</p>}
      <div className="mb-3">
        <label>Amount (₹)</label>
        <input type="number" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div className="mb-3">
        <label>Duration (Months)</label>
        <input type="number" className="form-control" value={duration} onChange={(e) => setDuration(e.target.value)} />
      </div>
      <div className="mb-3">
        <label>Interest Rate (%)</label>
        <input type="number" className="form-control" value={interestRate} readOnly />
      </div>
      <button className="btn btn-primary" onClick={handleCreateFD}>Create FD</button>
    </div>
  );
}
