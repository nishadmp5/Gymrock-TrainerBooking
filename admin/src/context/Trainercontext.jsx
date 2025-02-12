import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'

export const TrainerContext = createContext()

const TrainerContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [tToken,setTToken] = useState(localStorage.getItem('tToken') ? localStorage.getItem('tToken') : '')
    const [appointments,setAppointments] = useState([])
    const [dashData,setDashData] = useState(false)
    const [profileData,setProfileData] = useState(false)

    const getAppointments = async () => {
        try {
            
            const {data} = await axios.get(backendUrl + '/api/trainer/appointments', {headers:{tToken: tToken}})
            console.log(tToken);
            if (data.success) {
                setAppointments(data.appointments)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const completeAppointment = async (appointmentId) => {
        try {

            const {data} = await axios.post(backendUrl + '/api/trainer/complete-appointment',{appointmentId},{headers:{tToken}})
            if(data.success){
                toast.success(data.message)
                getAppointments()
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }


    const cancelAppointment = async (appointmentId) => {
        try {

            const {data} = await axios.post(backendUrl + '/api/trainer/cancel-appointment',{appointmentId},{headers:{tToken}})
            if(data.success){
                toast.success(data.message)
                getAppointments()
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/trainer/dashboard',{headers:{tToken}})
            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData);
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)

        }
    }

    const getProfileData = async () => {
        try {

            const {data} = await axios.get(backendUrl + '/api/trainer/profile',{headers:{tToken}})
            if (data.success) {
                setProfileData(data.profileData)
                console.log(data.profileData)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    
    const value = {
        tToken,setTToken,
        backendUrl,
        appointments,setAppointments,
        getAppointments,
        completeAppointment,cancelAppointment,
        dashData,setDashData,getDashData,
        profileData,setProfileData,getProfileData
    }

    return (
        <TrainerContext.Provider value={value}>
            {props.children}
        </TrainerContext.Provider>
    )
}

export default TrainerContextProvider