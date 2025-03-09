import React from 'react'
import { motion } from "framer-motion";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

function PostHeader() {
  return (
    <header className="flex justify-between items-center p-6 bg-gradient-to-r from-teal-50 via-blue-50 to-indigo-50 shadow-md sticky top-0 z-50">
    <motion.div
      className="flex items-center space-x-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img 
        src="/logo.svg" 
        alt="CareerElevate Logo" 
        className="h-12 w-12 transition-transform duration-300 hover:scale-110" 
      />
      <span className="text-2xl font-extrabold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600">
        CareerElevate
      </span>
    </motion.div>
    <nav className="hidden md:flex items-center space-x-10">
      {[
        { href: "/homepage", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/contactus", label: "Contact Us" },
        { href: "/blog", label: "Blog" },
      ].map((item, index) => (
        <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link 
            href={item.href} 
            className="text-gray-700 text-lg font-medium hover:text-teal-600 transition-colors duration-300"
          >
            {item.label}
          </Link>
        </motion.div>
      ))}
    </nav>
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
      <UserButton/>
    </motion.div>
  </header>
  )
}

export default PostHeader