import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaCheck, FaUser, FaDollarSign, FaComments, FaCreditCard } from "react-icons/fa";

export default function MakePayments() {
  const navigate = useNavigate();
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Bank Transfer");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleMakePayment = async () => {
    if (!senderId || !receiverId || !amount) {
      setMessage(" Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8081/make-payment/${senderId}`, {
        receiverId,
        amount,
        method,
        description
      });

      setMessage(response.data.message || " Payment successful!");
    } catch (error) {
      setMessage("Error processing payment.");
      console.error("Payment error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Make a Payment</h2>

        <div className="space-y-4">
          <div className="flex items-center border p-3 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Sender ID"
              value={senderId}
              onChange={(e) => setSenderId(e.target.value)}
              className="w-full outline-none"
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
            <FaDollarSign className="text-gray-500 mr-2" />
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
              <option value="Bank Transfer"> Bank Transfer</option>
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
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
