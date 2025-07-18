// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/contact-us/page.jsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import PostHeader from "../homepage/_components/PostHeader";

export default function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Form state
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.message) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Form submitted:", formData); // Replace with API call
    differentContactsetSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  // Navigation Links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/mock-interviews", label: "Mock Interviews" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="flex justify-between items-center p-6 bg-gradient-to-r from-teal-700 to-indigo-700 text-white shadow-lg sticky top-0 z-50">
        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/">
            <img 
              src="/logo.svg" 
              alt="CareerElevate Logo" 
              className="h-14 w-14 transition-transform duration-300 hover:scale-110 hover:rotate-3" 
            />
          </Link>
          <Link href="/">
            <span className="text-3xl font-bold">CareerElevate</span>
          </Link>
        </motion.div>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={item.href}
                className={`text-lg font-medium ${item.href === "/contact" ? "text-teal-300" : "text-white"} hover:text-teal-300 transition-colors duration-300 relative group`}
              >
                {item.label}
                <span className={`absolute left-0 bottom-[-6px] w-0 h-1 bg-teal-300 group-hover:w-full transition-all duration-300 ${item.href === "/contact" ? "w-full" : ""}`}></span>
              </Link>
            </motion.div>
          ))}
        </nav>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <UserButton />
        </motion.div>
      </header> */}
      <PostHeader/>

      {/* Main Content */}
      <main className="flex-grow py-24 px-6 max-w-5xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600"
            variants={itemVariants}
          >
            Let’s Connect
          </motion.h1>
          <motion.p
            className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Have questions or need support? We’re just a message away.
          </motion.p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto mb-16"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Send Us a Message</h2>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-teal-600 text-lg text-center"
            >
              Thanks for reaching out! We’ll respond soon.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={`w-full p-4 rounded-xl border ${errors.name ? "border-red-500" : "border-gray-300"} focus:border-teal-600 focus:ring focus:ring-teal-200 transition-all duration-300`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className={`w-full p-4 rounded-xl border ${errors.email ? "border-red-500" : "border-gray-300"} focus:border-teal-600 focus:ring focus:ring-teal-200 transition-all duration-300`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className={`w-full p-4 rounded-xl border ${errors.subject ? "border-red-500" : "border-gray-300"} focus:border-teal-600 focus:ring focus:ring-teal-200 transition-all duration-300`}
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
              </div>
              <div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="5"
                  className={`w-full p-4 rounded-xl border ${errors.message ? "border-red-500" : "border-gray-300"} focus:border-teal-600 focus:ring focus:ring-teal-200 transition-all duration-300`}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Send Message
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Contact Options */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              title: "Email Us",
              desc: "support@careerelevate.com",
              icon: "✉️",
              href: "mailto:support@careerelevate.com",
            },
            {
              title: "Call Us",
              desc: "+1 (555) 987-6543",
              icon: "📞",
              href: "tel:+15559876543",
            },
            {
              title: "Chat Live",
              desc: "Available 24/7",
              icon: "💬",
              href: "#", // Replace with live chat link if applicable
            },
          ].map((option, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-4xl text-teal-600 mb-4">{option.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.title}</h3>
              <p className="text-gray-600">
                <a href={option.href} className="text-teal-600 hover:underline">
                  {option.desc}
                </a>
              </p>
            </motion.div>
          ))}
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
            {["Home", "About", "Contact", "Privacy"].map((item, index) => (
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