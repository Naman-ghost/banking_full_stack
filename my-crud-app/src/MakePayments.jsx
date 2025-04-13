import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  FaArrowLeft,
  FaCheck,
  FaUser,
  FaComments,
  FaCreditCard,
} from "react-icons/fa";

export default function MakePayments() {
  const navigate = useNavigate();
  const { id: senderIdFromURL } = useParams(); // sender ID from URL
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("RTGS");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState(""); // Password input for confirmation
  const [isConfirming, setIsConfirming] = useState(false); // Flag to check if the user is confirming the transaction

  // Prevent page refresh during payment
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isConfirming) return; // Don't show warning during transaction confirmation
      const message = "Page is refreshing which is not allowed during transaction.";
      event.returnValue = message; // Standard for most browsers
      return message; // Some browsers require this as well for confirmation
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isConfirming]);

  // Handle the payment request
  const handleMakePayment = async () => {
    if (!receiverId || !amount) {
      setMessage("Please fill in all required fields.");
      return;
    }

    // Ask for confirmation before proceeding
    const confirmation = prompt(
      "Type 'YES' to confirm the transaction."
    );
    if (confirmation !== "YES") {
      setMessage("Transaction cancelled.");
      return;
    }

    // Ask user for their password to authorize the transaction
    setIsConfirming(true);
    const enteredPassword = prompt("Please enter your password to confirm the payment.");
    if (!enteredPassword) {
      setMessage("Transaction cancelled due to missing password.");
      setIsConfirming(false);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8081/make-payment/${senderIdFromURL}`, // sender in URL
        {
          receiverId,
          amount,
          method,
          description,
          password: enteredPassword, // Send password for verification
        }
      );

      setMessage(response.data.message || "Payment successful!");
      setIsConfirming(false); // Reset confirmation flag after payment
    } catch (error) {
      console.error("Payment error:", error);
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Error processing payment.");
      }
      setIsConfirming(false); // Reset confirmation flag if error occurs
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Make a Payment
        </h2>

        <div className="space-y-4">
          <div className="flex items-center border p-3 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed">
            <FaUser className="mr-2" />
            <input
              type="text"
              value={senderIdFromURL}
              disabled
              className="w-full bg-transparent outline-none"
            />
          </div>

          <div className="flex items-center border p-3 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Receiver ID"
              value={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center border p-3 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
            <span className="text-gray-500 mr-2">₹</span>
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center border p-3 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
            <FaCreditCard className="text-gray-500 mr-2" />
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full outline-none bg-transparent"
            >
              <option value="RTGS">RTGS</option>
              <option value="NEFT">NEFT</option>
              <option value="UPI">UPI</option>
            </select>
          </div>

          <div className="flex items-center border p-3 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
            <FaComments className="text-gray-500 mr-2" />
            <textarea
              placeholder="Payment Description (Optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full outline-none"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>

          <button
            onClick={handleMakePayment}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            disabled={isConfirming} // Disable the button during confirmation
          >
            <FaCheck className="mr-2" /> Pay Now
          </button>
        </div>

        {message && (
          <p className="mt-4 text-center text-sm font-semibold text-red-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
