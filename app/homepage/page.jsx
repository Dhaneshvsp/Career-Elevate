// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/homepage/page.jsx
"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import PostHeader from "./_components/PostHeader";
import { TypingAnimation } from "@/components/magicui/typing-animation";

export default function Home() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  // Sync user with the database when they sign in
  useEffect(() => {
    if (!isLoaded) {
      console.log("[HomePage] User data not yet loaded");
      return;
    }

    if (!user) {
      console.log("[HomePage] No user signed in");
      return;
    }

    const syncUser = async () => {
      try {
        console.log("[HomePage] Syncing user with database, clerkId:", user.id);
        const response = await fetch("/api/sync-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        if (response.ok) {
          console.log("[HomePage] User sync result:", result);
        } else {
          console.error("[HomePage] Error syncing user:", result.error);
        }
      } catch (error) {
        console.error("[HomePage] Error syncing user:", error);
      }
    };

    syncUser();
  }, [user, isLoaded]);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <PostHeader />

      {/* Hero Section */}
      <section className="text-center py-24 px-6 bg-gradient-to-r from-teal-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')] opacity-10"></div>
        <motion.div 
          className="relative z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600"
            variants={itemVariants}
          >
            <TypingAnimation>Welcome Back to CareerElevate</TypingAnimation>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Continue mastering interviews, resumes, and certifications with AI-powered tools.
          </motion.p>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button 
              onClick={() => router.push("/dashboard")} 
              className="bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Go to Dashboard
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <motion.h2
          className="text-4xl font-extrabold text-center text-gray-900 mb-16 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Your Tools for Success
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { icon: "🎤", title: "Mock Interviews", desc: "Practice with AI and refine your skills." },
            { icon: "📄", title: "Resume Builder", desc: "Build ATS-ready resumes effortlessly." },
            { icon: "📜", title: "Certification Quizzes", desc: "Earn certificates to boost your career." },
            { icon: "📊", title: "Performance Analytics", desc: "Track progress with AI insights." },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center border-t-4 border-teal-500"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-teal-600 text-5xl mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 text-base leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-gradient-to-b from-indigo-900 to-teal-900 text-white">
        <motion.h2
          className="text-4xl font-extrabold text-center mb-16 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          What Our Users Say
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { text: "AI mock interviews transformed my confidence!", name: "Jane D.", image: "https://randomuser.me/api/portraits/women/44.jpg" },
            { text: "Resume builder got me callbacks fast!", name: "John S.", image: "https://randomuser.me/api/portraits/men/32.jpg" },
            { text: "Quizzes helped me land a tech role!", name: "Emily J.", image: "https://randomuser.me/api/portraits/women/68.jpg" },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-md p-6 rounded-xl hover:bg-white/20 transition-all duration-300 flex flex-col items-center text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mb-4 shadow-md" />
              <p className="text-gray-200 italic mb-4">"{testimonial.text}"</p>
              <p className="text-teal-300 font-semibold">- {testimonial.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white text-center">
        <p className="text-gray-300 text-lg mb-4">
          Trusted by pros at <span className="font-semibold text-teal-400">Google, Meta, Amazon</span> & more
        </p>
        <div className="flex justify-center space-x-8 mb-6">
          {["Home", "About", "Mock Interviews", "Blog"].map((item, index) => (
            <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`} 
                className="text-gray-400 hover:text-teal-400 transition-colors duration-300"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </div>
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} CareerElevate. All rights reserved.
        </p>
      </footer>
    </div>
  );
}