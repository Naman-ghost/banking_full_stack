import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";  // Added useNavigate
import { Link } from "react-router-dom";

export default function FDs() {
  const { userId } = useParams();  // Get userId from URL params
  const navigate = useNavigate();  // Initialize navigate

  const [fds, setFDs] = useState([]);

  useEffect(() => {
    if (!userId) {
      console.error("No userId found in URL parameters!");
      return;
    }

    // Use userId from URL to fetch FD data
    axios
      .get(`http://localhost:8081/fds/${userId}`)
      .then((response) => setFDs(response.data))
      .catch((error) => console.error("Error fetching FDs:", error));
  }, [userId]);

  return (
    <div className="container mt-5">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="btn btn-secondary mb-3"
      >
        ← Back
      </button>

      <h2 className="mb-4">Your Fixed Deposits</h2>

      {/* Corrected Link: dynamic userId */}
      <Link to={`/fixed-deposits/${userId}`} className="btn btn-success mb-3">
        Create New FD
      </Link>

      {fds.length === 0 ? (
        <p>No Fixed Deposits found.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>FD ID</th>
              <th>Amount</th>
              <th>Interest Rate</th>
              <th>Start Date</th>
              <th>Maturity Date</th>
            </tr>
          </thead>
          <tbody>
            {fds.map((fd) => (
              <tr key={fd.fd_id}>
                <td>{fd.fd_id}</td>
                <td>₹{fd.amount}</td>
                <td>{fd.interest_rate}%</td>
                <td>{new Date(fd.start_date).toLocaleDateString()}</td>
                <td>{new Date(fd.maturity_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
