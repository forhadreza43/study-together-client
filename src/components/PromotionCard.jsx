import React from "react";
import {motion} from "motion/react"
const PromotionCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg p-8 py-10 flex flex-col items-center justify-center mx-auto w-11/12 lg:w-full"
    >
      <h2 className="text-3xl font-bold mb-4">Special Promotion!</h2>
      <p className="mb-6 text-lg">
        Join our group study now and unlock exclusive resources, assignments,
        and more. Don't miss out!
      </p>
      {/* <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-full shadow hover:bg-blue-100 transition">
        Get Started
      </button> */}
    </motion.div>
  );
};

export default PromotionCard;
