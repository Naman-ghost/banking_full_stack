import React from 'react';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-8">
        <h2 className="text-3xl font-semibold text-center text-indigo-600">Contact Us</h2>
        <p className="text-lg text-center text-gray-600">We'd love to hear from you. Please reach out using the contact details below.</p>

        {/* Hardcoded Contact Information */}
        <div className="mt-10 text-center space-y-6">
          <h3 className="text-2xl font-semibold text-gray-700">Our Contact Details</h3>
          
          {/* Helpline */}
          <div className="space-y-4">
            <p className="text-gray-700">Helpline: +91 123 456 7890</p>
            
            {/* Bank Address */}
            <p className="text-gray-700">Bank Address: 123 Bank St, Mumbai, India</p>
            
            {/* Email Address */}
            <p className="text-gray-700">Email: contact@bank.com</p>
          </div>

          {/* Optional: Add Social Media Links */}
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
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
