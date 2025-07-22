// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/mock-interviews/_components/Header.jsx

"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for mobile menu

function Header() {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <nav className="bg-secondary shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src={"/logo.svg"} width={80} height={60} alt="logo" />
          <h2 className="text-2xl md:text-3xl font-semibold">
            Career<span className="bg-black text-white px-2 py-1 rounded-lg">Elevate</span>
          </h2>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex justify-between gap-6">
          {[
            { name: "mock-interviews", path: "/mock-interviews" },
            { name: "FAQs", path: "/mock-interviews/questions" },
            // { name: "How it works?", path: "/mock-interviews/howitworks" },
            { name: "Previous Interviews", path: "/mock-interviews/InterviewList" },
          ].map((item) => (
            <li
              key={item.path}
              className={` hover:font-bold transition-all cursor-pointer ${
                path === item.path ? "bg-black text-white py-2 px-2 rounded-full" : ""
              }`}
            >
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>

        {/* User Profile */}
        <div className="hidden md:block scale-150">
          <UserButton />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Navigation - Sliding Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-secondary text-white shadow-lg p-4">
          <ul className="flex flex-col gap-4 text-lg">
            {[
              { name: "mock-interviews", path: "/mock-interviews" },
              { name: "Questions", path: "/mock-interviews/questions" },
              { name: "How it works?", path: "/mock-interviews/howitworks" },
              { name: "Previous Interviews", path: "/mock-interviews/InterviewList" },
            ].map((item) => (
              <li
                key={item.path}
                className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
                  path === item.path ? "text-primary font-bold" : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                <Link href={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>

          {/* Mobile User Profile */}
          <div className="mt-4 flex justify-center">
            <UserButton />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
