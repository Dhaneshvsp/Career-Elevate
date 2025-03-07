// "use client"
// import { UserButton } from '@clerk/nextjs'
// import Image from 'next/image'
// import { usePathname } from 'next/navigation'
// import React, { useEffect } from 'react'

// function Header() {
//   const path=usePathname();
//   useEffect(()=>{
//     console.log(path);
//   },[])
//   return (
//     <div className='flex p-4 items-centre justify-between bg-secondary shadow-md'>
//     <div className='flex gap-1'><Image src={'/logo.svg'} width={80} height={60} alt='logo'/>
//     <h2 className='mt-3 text-3xl'>Career<span className='bg-black text-white p-0.6 rounded-lg'>Elevate</span></h2></div>
//     <ul className=' hidden md:flex gap-6 items-end'>
//       <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//         ${path=='/dashboard'&&'text-primary font-bold'}`}>Dashboard</li>
//       <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//         ${path=='/dashboard/questions'&&'text-primary font-bold'}`}>Questions</li>
//       {/* <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//         ${path=='/dashboard/upgrade'&&'text-primary font-bold'}`}>Upgrade</li> */}
//       <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//         ${path=='/dashboard/howitworks'&&'text-primary font-bold'}`}>How it works?</li>
//     </ul>
//     <UserButton/>
//     </div>
//   )
// }

// export default Header

// "use client"
// import { UserButton } from '@clerk/nextjs'
// import Image from 'next/image'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import React, { useEffect } from 'react'

// function Header() {
//   const path = usePathname();

//   useEffect(() => {
//     console.log(path);
//   }, [path]);

//   return (
//     <div className='flex p-4 items-center justify-between bg-secondary shadow-md'>
//       <div className='flex gap-1'>
//         <Image src={'/logo.svg'} width={80} height={60} alt='logo' />
//         <h2 className='mt-3 text-3xl'>Career<span className='bg-black text-white p-0.6 rounded-lg'>Elevate</span></h2>
//       </div>
//       <ul className='hidden md:flex gap-6 items-end'>
//         <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//           ${path === '/dashboard' ? 'text-primary font-bold' : ''}`}>
//           <Link href="/dashboard">Dashboard</Link>
//         </li>
//         <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//           ${path === '/dashboard/questions' ? 'text-primary font-bold' : ''}`}>
//           <Link href="/dashboard/questions">Questions</Link>
//         </li>
//         <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//           ${path === '/dashboard/howitworks' ? 'text-primary font-bold' : ''}`}>
//           <Link href="/dashboard/howitworks">How it works?</Link>
//         </li>
//         <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//           ${path === '/dashboard/InterviewList' ? 'text-primary font-bold' : ''}`}>
//           <Link href="/dashboard/InterviewList">Previous Interviews</Link>
//         </li>
//       </ul>
//       <div className="scale-150 origin-center"> {/* Increase size by 1.5x */}
//       <UserButton />
//     </div>
//     </div>
//   )
// }

// export default Header;


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
        <ul className="hidden md:flex gap-6">
          {[
            { name: "Dashboard", path: "/dashboard" },
            { name: "Questions", path: "/dashboard/questions" },
            { name: "How it works?", path: "/dashboard/howitworks" },
            { name: "Previous Interviews", path: "/dashboard/InterviewList" },
          ].map((item) => (
            <li
              key={item.path}
              className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
                path === item.path ? "text-primary font-bold" : ""
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
              { name: "Dashboard", path: "/dashboard" },
              { name: "Questions", path: "/dashboard/questions" },
              { name: "How it works?", path: "/dashboard/howitworks" },
              { name: "Previous Interviews", path: "/dashboard/InterviewList" },
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
