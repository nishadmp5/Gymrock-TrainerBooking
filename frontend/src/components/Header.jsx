import React from 'react'
import { assets } from '../assets/assets'
import { FaArrowRight } from "react-icons/fa6";


const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary text-gray-700  rounded-lg px-6 md:px-10 lg:px-20'>
        {/* -------Left Side--------- */}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
           <p className='text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight md:leading-tight lg:leading-tight'>
           Get Fit, Stay Strong <br />Schedule Your Session!
            </p> 
            <div className='flex flex-col md:flex-row items-center gap-3   text-sm font-light'>
                <p>Easily find expert trainers ,<br  className='hidden sm:block'/>  book your session stress-free</p>
            </div>
            <a href="#category" className='flex items-center gap-2 bg-gray-700 px-8 py-3 rounded-full text-gray-200 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300' >
                Book appoinment <FaArrowRight />
            </a>
        </div>

        {/* ---------Right Side--------- */}
        <div className='md:w-1/2 relative '>
<img className='w-full md:absolute bottom-0 h-full object-contain rounded-lg' src={assets.header_img} alt="" />
        </div>
    </div>
  )
}

export default Header


// – 