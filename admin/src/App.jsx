import React from 'react'
import Login from './pages/Login'
import { ToastContainer, toast, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext } from 'react'
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import AllAppointments from './pages/Admin/AllAppointments'
import Dashboard from './pages/Admin/Dashboard'
import AddTrainer from './pages/Admin/AddTrainer'
import TrainersList from './pages/Admin/TrainersList'
import { TrainerContext } from './context/Trainercontext'
import TrainerDashboard from './pages/Trainer/TrainerDashboard'
import TrainerAppointments from './pages/Trainer/TrainerAppointments'
import TrainerProfile from './pages/Trainer/TrainerProfile'
import Loading from './components/Loading'

const App = () => {

  const {aToken} = useContext(AdminContext)
  const {tToken} = useContext(TrainerContext)

  return aToken || tToken ? (
    <div className='bg-[#F8F9FD]'>
       <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Flip}
      />
      <Loading/>
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          {/* Admin Route  */}
          <Route path='/' element={<Dashboard/>} />
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/all-appointments' element={<AllAppointments/>}/>
          <Route path='/add-trainer' element={<AddTrainer/>}/>
          <Route path='/trainer-list' element={<TrainersList/>}/>
          
          {/* Trainer Route  */}
          <Route path='/trainer-dashboard' element={<TrainerDashboard/>}/>
          <Route path='/trainer-appointments' element={<TrainerAppointments/>}/>
          <Route path='/trainer-profile' element={<TrainerProfile/>}/>
        </Routes>
      </div>

    </div>
  ) : (
    <>
     <Login/>
      <ToastContainer/>
    </>
  )
}

export default App