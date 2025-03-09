"use client";
import React from "react";
import { motion } from "framer-motion";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import PostHeader from "../homepage/_components/PostHeader";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-teal-50 via-blue-100 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute w-96 h-96 bg-teal-400/20 rounded-full blur-3xl top-10 left-[-150px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl bottom-20 right-[-100px]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Header */}
      <PostHeader/>

      {/* Main Content */}
      <main className="flex-grow py-20 px-6 max-w-6xl mx-auto w-full relative z-10">
        {/* Hero Section */}
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-700 to-indigo-700"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          About CareerElevate
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-gray-800 mb-12 text-center max-w-3xl mx-auto"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          Transforming careers with AI innovation—one step at a time.
        </motion.p>

        {/* Our Mission */}
        <section className="mb-16">
          <motion.h2
            className="text-3xl font-semibold text-gray-900 mb-6 text-center"
            variants={itemVariants}
            whileInView="visible"
            viewport={{ once: true }}
          >
            Our Mission
          </motion.h2>
          <motion.div
            className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-8 border-t-4 border-teal-600"
            variants={itemVariants}
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-gray-700 text-lg leading-relaxed">
              At CareerElevate, we’re passionate about empowering professionals to reach their full potential. Our AI-driven tools—mock interviews, resume builders, and certification quizzes—are designed to make career growth smarter, faster, and more accessible. We’re here to turn your ambitions into achievements.
            </p>
          </motion.div>
        </section>

        {/* Why We Stand Out */}
        <section className="mb-16">
          <motion.h2
            className="text-3xl font-semibold text-gray-900 mb-6 text-center"
            variants={itemVariants}
            whileInView="visible"
            viewport={{ once: true }}
          >
            Why We Stand Out
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: "🤖",
                title: "AI-Powered Precision",
                desc: "Tailored insights to supercharge your career path.",
                color: "teal-600",
              },
              {
                icon: "🚀",
                title: "Rapid Results",
                desc: "Fast-track your success with efficient tools.",
                color: "indigo-600",
              },
              {
                icon: "🌍",
                title: "Worldwide Impact",
                desc: "Supporting pros globally, from startups to giants.",
                color: "blue-600",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={`text-5xl text-${item.color} mb-4`}>{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Meet the Team */}
        <section className="mb-16">
          <motion.h2
            className="text-3xl font-semibold text-gray-900 mb-6 text-center"
            variants={itemVariants}
            whileInView="visible"
            viewport={{ once: true }}
          >
            Meet the Team
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Alex Carter",
                role: "Founder & AI Lead",
                image: "https://randomuser.me/api/portraits/men/45.jpg",
              },
              {
                name: "Priya Sharma",
                role: "UX Designer",
                image: "https://randomuser.me/api/portraits/women/72.jpg",
              },
              {
                name: "Liam Brooks",
                role: "Career Strategist",
                image: "https://randomuser.me/api/portraits/men/19.jpg",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center overflow-hidden"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-teal-600 font-medium">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Call to Action */}
        <motion.div
          className="text-center bg-gradient-to-r from-teal-600 to-indigo-600 p-8 rounded-2xl shadow-xl"
          variants={itemVariants}
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-white mb-4">
            Ready to Elevate Your Career?
          </h3>
          <Link
            href="/dashboard"
            className="bg-white text-teal-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:bg-gray-100 inline-block"
          >
            Get Started
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
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
            {["Home", "About", "Support", "Privacy"].map((item, index) => (
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