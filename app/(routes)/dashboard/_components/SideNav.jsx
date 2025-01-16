"use client"
import React from 'react'
import Image from 'next/image'
import { Landmark, LayoutGrid, ReceiptIndianRupee, ShieldCheck } from 'lucide-react'
import { SignOutButton, UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

function SideNav() {
    const PageList =[
    {id:1,name:"Dashboard",icon:LayoutGrid, path:"/dashboard"},
    {id:2,name:"Budgets",icon:Landmark, path:"/dashboard/budgets"},
    {id:3,name:"Expenses",icon:ReceiptIndianRupee, path:"/dashboard/expenses"},
    {id:4,name:"Upgrade",icon:ShieldCheck, path:"/dashboard/upgrade"},
    ]

    const path =usePathname();
    useEffect(() => {
      console.log(path);
      }, [path]);

  return (
    <div className='h-screen p-3 border shadow-sm'>
      <Image src={"./logo.svg"} 
                  alt="Logo" 
                  width={100} 
                  height={24} 
                  priority 
                  />

      <div className='mt-5'>
        {PageList.map((page , index)=>(
          <Link key={index} href={page.path} >
              <h2 className={`flex items-center gap-2 text-gray-500 font-medium mb-2 p-5 cursor-pointer rounded-md
                hover:bg-black hover:text-cyan-50
                ${path==page.path&& 'text-cyan-50 bg-black'}`
                }>
                  <page.icon/>
                  {page.name}
              </h2>
           </Link>
        ))}
      </div>
      
        <div className=' fixed bottom-10 w-56 mt-5 p-5 items-center text-lg rounded-md 
        hover:bg-black hover:text-red-500'>
          <SignOutButton/>
        </div> 
    </div>
  )
}

export default SideNav
