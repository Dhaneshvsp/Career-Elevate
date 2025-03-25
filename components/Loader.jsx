// import React from "react";

// export default function Loader() {
//   return (
//     <div className="fixed left-0 top-0 w-full h-full z-20 flex items-center justify-center pointer-events-none">
//       <div className="loader"></div>
//     </div>
//   );
// }
import React from "react";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-gray-100/80 z-50 flex items-center justify-center pointer-events-none">
      <motion.div
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}