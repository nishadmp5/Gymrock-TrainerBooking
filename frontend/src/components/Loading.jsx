import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Loading = () => {

    const { loading, setLoading } = useContext(AppContext)

  return (
    <div className={`absolute top-5  gap-4 bg-[#171c18] items-center px-10 py-2 left-1/2 transform -translate-x-1/2 ${loading ? 'flex' : 'hidden'}`}>
      <img className="h-10" src={assets.loading_icon} alt="" />
        <p className="text-gray-200 text-md">updating...</p>
      </div>
  )
}

export default Loading