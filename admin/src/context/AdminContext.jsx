import { useContext, useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import { AppContext } from "./AppContext";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken,setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
    const [trainers,setTrainers] = useState([])
    const [appointments,setAppointments] = useState([])
    const [dashData,setDashData] = useState(false)
    const {loading,setLoading} = useContext(AppContext)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllTrainers = async () => {
        try {
            
            const {data} = await axios.post(backendUrl + '/api/admin/all-trainers',{},{headers: {aToken}})
            if(data.success){
                setTrainers(data.trainers)
                console.log(data.trainers);
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    const changeAvailability = async (trainerId) => {
        setLoading(true)
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', {trainerId},{headers:{aToken}})
            if(data.success){
                setLoading(false)
                toast.success(data.message)
                getAllTrainers()
            }else{
                setLoading(false)
                toast.error(data.message)
            }

        } catch (error) {
            setLoading(false)
            console.log(error.message);
            toast.error(error.message)
        }
    }


    const getAllAppointments = async () => {
        try {
            
            const {data} = await axios.get(backendUrl+'/api/admin/appointments',{headers:{aToken}})

            if(data.success){
                setAppointments(data.appointments)
                console.log(data.appointments);
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }


    const cancelAppointment = async (appointmentId) => {
        setLoading(true)
        try {

            const {data} = await axios.post(backendUrl+ '/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}})
            if(data.success){
                setLoading(false)
                toast.success(data.message)
                getAllAppointments()
            }else{
                setLoading(false)
                toast.error(data.message)
            }
            
        } catch (error) {
            setLoading(false)
            toast.error(error.message)
        }
    }

    const getDashData = async () => {
        
        try {
            
            const {data} = await axios.get(backendUrl + '/api/admin/dashboard',{headers:{aToken}})

            if(data.success){
                setDashData(data.dashData)
                console.log(data.dashData);
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    
    const value = {
        aToken,setAToken,
        backendUrl,trainers,
        getAllTrainers,changeAvailability,
        appointments,setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData,getDashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider