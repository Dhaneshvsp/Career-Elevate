// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/homepage/layout.jsx
"use client"
import React, { useState,useEffect } from 'react'
import Header from './_components/Header'
import AOS from "aos";
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs';

function layout({children}) {
  const [currentPage, setCurrentPage] = useState("Home");
    const [showFeatures, setShowFeatures] = useState(false);
  return (
    <div>
     {/* <header className="bg-black shadow-md py-4 fixed top-0 left-0 w-full z-50 flex justify-between px-3 items-center">
          <div className="font-bold text-xl bg-white p-3 rounded-lg flex justify-center items-center">
            <Image src={'/logo.svg'} height={100} width={100} alt="logo"/>
            <p className='pt-2 font-4xl'>Career<span className='bg-black text-white p-1 rounded-lg'>Elevate</span></p>
          </div>
          <ul className="flex justify-evenly items-center gap-11 text-white font-bold text-[1.5rem] hover:cursor-pointer">
            <li >
              Resume Builder
            </li>
            <li>
              Skill Testing
            </li>
            <li className="">
             Interview Prep
            </li>
            <li className="">Contact</li>
          </ul>
          <div className='bg-white rounded-[100%] flex justify-center items-center p-3'>
          <UserButton size={150}/>
          </div>
       
      </header> */}
    {children}
    </div>
    
  )
}

export default layout