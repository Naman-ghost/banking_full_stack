import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBox = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <motion.div
        initial={{ opacity: 0, x: -100 }}  // Initial state
        animate={{ opacity: 1, x: 0 }}     // End state
        exit={{ opacity: 0, x: 100 }}      // Exit state (for animations on component exit)
        transition={{ duration: 1 }}        // Transition properties (like speed)
        className="w-40 h-40 bg-blue-500 rounded-lg"
      >
        <h2 className="text-white text-center pt-14">Hello!</h2>
      </motion.div>
    </div>
  );
};

export default AnimatedBox;
