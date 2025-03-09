"use client";
import React from "react";
import { motion } from "framer-motion";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import PostHeader from "../homepage/_components/PostHeader";

export default function Dashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Feature data with images and icons (replace URLs with your own)
  const features = [
    {
      title: "Start Mock Interview",
      desc: "Practice with AI and get instant feedback.",
      href: "/mock-interviews",
      image: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      icon: "🎤",
    },
    {
      title: "Edit Resume",
      desc: "Craft an ATS-optimized resume in minutes.",
      href: "/resume-builder",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      icon: "📄",
    },
    {
      title: "Take a Quiz",
      desc: "Earn certifications to boost your career.",
      href: "/quizzes",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      icon: "📜",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="flex justify-between items-center p-6 bg-gradient-to-r from-teal-50 via-blue-50 to-indigo-50 shadow-md sticky top-0 z-50">
        <motion.div
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src="/logo.svg" 
            alt="CareerElevate Logo" 
            className="h-12 w-12 transition-transform duration-300 hover:scale-110 hover:rotate-6" 
          />
          <span className="text-2xl font-extrabold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600">
            CareerElevate
          </span>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <UserButton />
        </motion.div>
      </header> */}
      <PostHeader/>

      {/* Main Content */}
      <main className="flex-grow py-20 px-6 max-w-6xl mx-auto w-full relative">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-5"></div>

        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="relative z-10">
          {/* Welcome Section */}
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600"
            variants={itemVariants}
          >
            Your Career Dashboard
          </motion.h1>
          <motion.p
            className="text-xl text-gray-700 mb-12 text-center max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Welcome back! Take charge of your career with AI-powered tools and insights.
          </motion.p>

          {/* Progress Overview */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 mb-12 border-t-4 border-teal-500"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Progress</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-teal-600">3</p>
                <p className="text-gray-600">Mock Interviews Completed</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-indigo-600">1</p>
                <p className="text-gray-600">Resume Drafts Saved</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">2</p>
                <p className="text-gray-600">Certifications Earned</p>
              </div>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={containerVariants}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white text-4xl">{feature.icon}</div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{feature.desc}</p>
                  <Link
                    href={feature.href}
                    className="bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 text-center"
                  >
                    Go
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>

      {/* Enhanced Footer */}
      <footer className="py-12 bg-gradient-to-r from-teal-900 to-indigo-900 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-200 text-lg mb-4">
            Powered by <span className="font-semibold text-teal-400">CareerElevate AI</span>
          </p>
          <div className="flex justify-center space-x-8 mb-6">
            {["Home", "Support", "Privacy", "Terms"].map((item, index) => (
              <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-teal-400 transition-colors duration-300"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} CareerElevate. All rights reserved.
          </p>
        </motion.div>
      </footer>
    </div>
  );
}