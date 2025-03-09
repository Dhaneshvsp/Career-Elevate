// "use client"
// import React from "react";
// import { useRouter } from "next/navigation";
// import { UserButton} from "@clerk/nextjs";
// import { motion } from "framer-motion";
// import Link from "next/link";


// export default function Home() {
//   const router = useRouter();

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Header */}
//       <header className="flex justify-between items-center p-6 bg-white shadow-md sticky top-0 z-50">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-3xl font-extrabold text-blue-700 flex items-center gap-2"
//         >
//           <img src="/logo.svg" alt="CareerElevate Logo" className="h-10" />
//           CareerElevate
//         </motion.div>
//         <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
//           <Link href="/" className="hover:text-blue-600">Home</Link>
//           <Link href="/about" className="hover:text-blue-600">About</Link>
//           <Link href="/mock-interviews" className="hover:text-blue-600">Mock Interviews</Link>
//           <Link href="/blog" className="hover:text-blue-600">Blog</Link>
//         </nav>
//         <UserButton/>
//         </header>

//       {/* Hero Section */}
//       <section className="text-center py-24 px-6 bg-gradient-to-r from-blue-50 to-blue-100">
//         <motion.h1
//           className="text-5xl font-extrabold text-gray-900 mb-6"
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//         >
//           Elevate Your Career with AI-Powered Preparation
//         </motion.h1>
//         <motion.p
//           className="text-xl text-gray-600 mb-8"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           Master interviews, build ATS-friendly resumes, and ace certification quizzes with CareerElevate.
//         </motion.p>
//         <motion.div whileHover={{ scale: 1.1 }}>
         
//             <button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg">
//               Get Started for Free
//             </button>
          
//         </motion.div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-20 px-6 bg-white">
//         <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Features</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
//           {[
//             { icon: "🎤", title: "Mock Interviews", desc: "Practice with AI avatars and receive real-time feedback." },
//             { icon: "📄", title: "Resume Builder", desc: "Create a professional, ATS-optimized resume in minutes." },
//             { icon: "📜", title: "Certification Quizzes", desc: "Test your knowledge and earn career-boosting certificates." },
//             { icon: "📊", title: "Performance Analytics", desc: "Track your improvement with AI-driven insights." },
//           ].map((feature, index) => (
//             <motion.div
//               key={index}
//               className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center"
//               whileHover={{ scale: 1.05 }}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.2 }}
//             >
//               <div className="text-blue-700 text-4xl mb-4">{feature.icon}</div>
//               <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
//               <p className="text-gray-600">{feature.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section id="testimonials" className="py-20 px-6 bg-gradient-to-r from-blue-50 to-blue-100">
//         <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">What Our Users Say</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {[
//             {
//               name: "Jane Doe",
//               review: "CareerElevate helped me ace my interviews with their AI mock interviews. Highly recommended!",
//               image: "https://randomuser.me/api/portraits/women/44.jpg",
//             },
//             {
//               name: "John Smith",
//               review: "The resume builder is a game-changer. I got multiple callbacks after using it!",
//               image: "https://randomuser.me/api/portraits/men/32.jpg",
//             },
//             {
//               name: "Emily Johnson",
//               review: "The certification quizzes are a great way to validate your skills. I landed a job at Google!",
//               image: "https://randomuser.me/api/portraits/women/68.jpg",
//             },
//           ].map((testimonial, index) => (
//             <motion.div
//               key={index}
//               className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center"
//               whileHover={{ scale: 1.05 }}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.2 }}
//             >
//               <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mb-4 shadow-md" />
//               <p className="text-gray-600 italic">"{testimonial.review}"</p>
//               <p className="mt-4 font-bold text-gray-800">- {testimonial.name}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-6 bg-gray-800 text-white text-center">
//         <p>© 2025 CareerElevate. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }


"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import PostHeader from "./_components/PostHeader";

export default function Home() {
  const router = useRouter();

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
      <PostHeader/>

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
            Welcome Back to CareerElevate
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
              <p className="text-gray-600 text-base leading-relaxed">{feature.desc}</p> {/* Fixed: Changed desc to feature.desc */}
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