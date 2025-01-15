import React from 'react'
import Image from 'next/image'

function Hero() {
  return (
    <section className="bg-gray-900 text-white flex items-center flex-col">
  <div className="my-16 mx-auto max-w-fit px-4 py-32 lg:flex lg:h-full lg:items-center">
    <div className="mx-auto max-w-3xl text-center">
      <h1
        className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
      >
        Your wallet's new best friend

        <span className="sm:block"> Smarter spending starts here! </span>
      </h1>

      <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
      Track every penny, stay in control. Spend smart, save better!
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
          href="#"
        >
          Get Started
        </a>
      </div>
    </div>
  </div>

<span className="flex items-center">
  <span className="h-1 flex-1 bg-white"></span>
  <span className="shrink-0 px-6">Overview</span>
  <span className="h-1 flex-1 bg-white"></span>
</span>

  <Image src={"/dashboard.png"} 
        alt="Hero" 
        width={1000} 
        height={700} 
        className='mt-5 rounded-xl border-2 mb-8'/>
</section>
)}

export default Hero
