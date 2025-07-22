"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Countdown({ intitialTimeLeft }) {
  const [timeLeft, setTimeLeft] = useState(intitialTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.reload();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
        <p className="text-lg sm:text-xl text-gray-700">
          Please try again in{" "}
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-xl sm:text-2xl text-blue-500 font-bold"
          >
            {timeLeft}
          </motion.span>{" "}
          seconds.
        </p>
        <p className="mt-2 text-sm sm:text-base text-gray-500">
          This page will automatically refresh.
        </p>
      </div>
    </motion.div>
  );
}

export default Countdown;