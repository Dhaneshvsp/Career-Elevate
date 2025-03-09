import React from 'react'
import Header from './_components/Header.jsx'

export default function DashboardLayout({children}) {
  return (
    <div>
      {/* <Header/> */}
      <div className=' mt-1'>
      {children}
      </div>
    </div>
  )
}

 