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

"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-md'>
      <div className='flex gap-1'>
        <Image src={'/logo.svg'} width={80} height={60} alt='logo' />
        <h2 className='mt-3 text-3xl'>Career<span className='bg-black text-white p-0.6 rounded-lg'>Elevate</span></h2>
      </div>
      <ul className='hidden md:flex gap-6 items-end'>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
          ${path === '/dashboard' ? 'text-primary font-bold' : ''}`}>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
          ${path === '/dashboard/questions' ? 'text-primary font-bold' : ''}`}>
          <Link href="/dashboard/questions">Questions</Link>
        </li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
          ${path === '/dashboard/howitworks' ? 'text-primary font-bold' : ''}`}>
          <Link href="/dashboard/howitworks">How it works?</Link>
        </li>
      </ul>
      <UserButton />
    </div>
  )
}

export default Header;
