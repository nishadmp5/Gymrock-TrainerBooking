import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import {useNavigate} from 'react-router-dom'
import { TrainerContext } from '../context/Trainercontext'

const Navbar = () => {

    const {aToken,setAToken} = useContext(AdminContext)
    const {tToken,setTToken} = useContext(TrainerContext)

    const navigate = useNavigate()

    const logout = () => {
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        tToken && setTToken('')
        tToken && localStorage.removeItem('tToken')
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs'>
        <div className="flex gap-4 items-center">
              <img className="h-9" src={assets.logo_icon} alt="" />
              <div className="flex flex-col items-center justify-center">
                <h1
                  onClick={() => navigate("/")}
                  className="cursor-pointer text-primary text-3xl font-mono font-bold"
                  alt=""
                >
                  GYMROCK
                </h1>
                <h1 className="text-gray-800">fitness studio</h1>
              </div>
            </div>
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Trainer'}</p>
        </div>
        <button onClick={logout} className='bg-primary text-gray-700 text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar