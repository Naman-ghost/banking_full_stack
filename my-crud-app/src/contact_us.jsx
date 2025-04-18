import React from 'react';
import { useNavigate } from 'react-router-dom';  

export default function ContactUs() {
  const navigate = useNavigate();  

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-8">
        
        
        <button 
          onClick={() => navigate(-1)} 
          className="mb-4 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-semibold text-center text-indigo-600">Contact Us</h2>
        <p className="text-lg text-center text-gray-600">
          We'd love to hear from you. Please reach out using the contact details below.
        </p>

        <div className="mt-10 text-center space-y-6">
          <h3 className="text-2xl font-semibold text-gray-700">Our Contact Details</h3>
          
          <div className="space-y-4">
            <p className="text-gray-700">Helpline: +91 123 456 7890</p>
            <p className="text-gray-700">Bank Address: Lal Kila, New Delhi</p>
            <p className="text-gray-700">Email: customersupport@finbanker.com</p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-700 mt-6">Follow Us On</h3>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
              Facebook
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
              Twitter
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
