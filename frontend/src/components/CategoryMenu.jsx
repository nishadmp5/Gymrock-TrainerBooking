import React from 'react'
import { assets } from '../assets/assets'
import { categoryData } from '../assets/assets'
import { Link } from 'react-router-dom'

const categoryMenu = () => {
  return (
    <div id="category" className='flex flex-col items-center gap-4 py-16 text-gray-200' >
        <h1 className='text-3xl font-medium'>Find by Category</h1>
        <p className='sm:w-[35%] text-center text-sm'>Simply browse through our list of trainers,<br  className='hidden sm:block'/>schedule your appointment hassle-free</p>
        <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
            {categoryData.map((item,index)=>(
                <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={index} to={`/trainers/${item.category}`}>
                    <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" />
                    <p>{item.category}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default categoryMenu