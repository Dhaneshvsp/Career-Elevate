"use client"; // Mark as client component for App Router

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter(); // Initialize router for App Router

  return (
    <header className="flex justify-between items-center p-6 bg-gradient-to-r from-teal-50 via-blue-50 to-indigo-50 shadow-md sticky top-0 z-50 transition-all duration-300 hover:shadow-lg">
      {/* Logo & Brand */}
      <div className="flex items-center space-x-3">
        <img 
          src="/logo.svg" 
          alt="CareerElevate Logo" 
          className="h-12 w-12 transition-transform duration-300 hover:scale-110 hover:rotate-6 drop-shadow-md"
        />
        <div className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-blue-700 to-indigo-600 transition-all duration-300 hover:from-teal-700 hover:via-blue-800 hover:to-indigo-700">
          CareerElevate
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-10">
        {[
          { href: "#features", label: "Features", baseColor: "text-teal-600", hoverColor: "hover:text-teal-700" },
          { href: "#how-it-works", label: "How It Works", baseColor: "text-blue-600", hoverColor: "hover:text-blue-700" },
          { href: "#testimonials", label: "Testimonials", baseColor: "text-indigo-600", hoverColor: "hover:text-indigo-700" },
          { href: "#faq", label: "FAQ", baseColor: "text-purple-600", hoverColor: "hover:text-purple-700" },
        ].map((item, index) => (
          <a 
            key={index} 
            href={item.href} 
            className={`${item.baseColor} text-lg font-medium ${item.hoverColor} transition-all duration-300 relative group`}
          >
            {item.label}
            {/* Underline Effect */}
            <span className={`absolute left-0 bottom-[-4px] w-0 h-0.5 bg-gradient-to-r from-${item.baseColor.split('-')[1]}-600 to-${item.hoverColor.split('-')[1]}-700 group-hover:w-full transition-all duration-300`}></span>
          </a>
        ))}
      </nav>

      {/* Buttons (Desktop) */}
      <div className="hidden md:flex items-center space-x-6">
        <button 
          onClick={() => router.push("/homepage")} 
          className="text-teal-600 text-lg font-semibold hover:text-teal-700 transition-all duration-300 hover:underline underline-offset-4"
        >
          Sign In
        </button>
        <button 
          onClick={() => router.push("/homepage")} 
          className="bg-gradient-to-r from-teal-600 via-blue-700 to-indigo-600 hover:from-teal-700 hover:via-blue-800 hover:to-indigo-700 text-white px-6 py-2.5 rounded-lg text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center space-x-2"
        >
          <span>Get Started</span>
          <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Mobile Hamburger Toggle */}
      <div className="md:hidden">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="text-indigo-600 hover:text-indigo-700 transition-colors duration-300"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-gradient-to-b from-teal-50 to-indigo-50 shadow-lg md:hidden transition-all duration-300 animate-slide-down">
          <nav className="flex flex-col items-center py-6 space-y-4">
            {[
              { href: "#features", label: "Features", color: "text-teal-600", hoverColor: "hover:text-teal-700" },
              { href: "#how-it-works", label: "How It Works", color: "text-blue-600", hoverColor: "hover:text-blue-700" },
              { href: "#testimonials", label: "Testimonials", color: "text-indigo-600", hoverColor: "hover:text-indigo-700" },
              { href: "#faq", label: "FAQ", color: "text-purple-600", hoverColor: "hover:text-purple-700" },
            ].map((item, index) => (
              <a 
                key={index} 
                href={item.href} 
                className={`text-lg font-medium ${item.color} ${item.hoverColor} transition-colors duration-300`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button 
              onClick={() => router.push("/homepage")} 
              className="text-teal-600 text-lg font-semibold hover:text-teal-700 transition-colors duration-300"
            >
              Sign In
            </button>
            <button 
              onClick={() => router.push("/homepage")} 
              className="bg-gradient-to-r from-teal-600 via-blue-700 to-indigo-600 text-white px-6 py-2 rounded-lg text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Get Started
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;