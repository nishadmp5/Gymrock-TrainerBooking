import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedTrainers from '../components/RelatedTrainers'
import { toast } from 'react-toastify'
import axios from 'axios'
import { BsInfoCircle } from "react-icons/bs";


const Appoinments = () => {

    const {trainerId} = useParams()
    const {trainers, currencySymbol, backendUrl, token, getTrainersData,loading,setLoading} = useContext(AppContext)
    const daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT']

    const navigate = useNavigate()

    const [trainerInfo,setTrainerInfo] = useState(null)
    const [trainerSlots,setTrainerSlots] = useState([])
    const [slotIndex,setSlotIndex] = useState(0)
    const [slotTime,setSlotTime] = useState('')

    const fetchTrainerInfo = async () => {
        const trainerInfo = trainers.find(trainer => trainer._id === trainerId)
        setTrainerInfo(trainerInfo)
    }

    const getAvailableSlots = async () => {
        setTrainerSlots([])

        // getting current date
        let today = new Date()

        for(let i = 0 ; i < 7 ; i++){
            // getting date with index
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate()+i)

            // setting end time of the date with index 
            let endTime = new Date()
            endTime.setDate(today.getDate()+i)
            endTime.setHours(22,0,0,0)

            // setting hours 
            if(today.getDate() === currentDate.getDate()){
                currentDate.setHours(currentDate.getHours() > 15 ? currentDate.getHours() + 1 : 15)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = []

            while(currentDate < endTime){
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit' , minute: '2-digit',hour12:true})

                let day = currentDate.getDate( )
                let month = currentDate.getMonth()+1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime

                const isSlotAvailable = trainerInfo.slots_booked[slotDate] && trainerInfo.slots_booked[slotDate].includes(slotTime) ? false : true ;

                if(isSlotAvailable){

                     // add slot to array 
                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime
                })

                }

               
                //Increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }

            setTrainerSlots(prev => ([...prev, timeSlots]))
        }
    }

    const bookAppointment = async () => {
        if(!token) {
            toast.warn('Login to book appointment')
            return navigate('/login')
        }

        setLoading(true)
        try {

            const date = trainerSlots[slotIndex][0].datetime

            let day = date.getDate()
            let month = date.getMonth()+1
            let year = date.getFullYear()

            const slotDate = day + "_" + month + "_" + year
            
            const { data } = await axios.post(backendUrl + '/api/user/book-appointment',{trainerId, slotDate, slotTime},{headers:{token}})
            if(data.success){
                setLoading(false)
                toast.success(data.message)
                getTrainersData()
                navigate('/my-appointments')
            }else{
                setLoading(false)
                toast.error(data.message)
            }

        } catch (error) {
            setLoading(false)
            console.log(error)
            toast.error(error.message)
        }
    }
    

    useEffect(() => {
        fetchTrainerInfo()
    },[trainers,trainerId])

    useEffect(() => {
        getAvailableSlots()
    },[trainerInfo])

    useEffect(() => {
        console.log(trainerSlots);
    },[trainerSlots])

  return trainerInfo && (
    <div>
        {/* --------Trainer Details-------- */}
        <div className='flex flex-col sm:flex-row gap-4'>
            <div>
                <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={trainerInfo.image} alt="" />
            </div>

            <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-black mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                {/* ---------Trainer Info : name,qualification,experience------- */}
                <p className='flex items-center gap-2 text-2xl font-medium text-gray-100'>
                    {trainerInfo.name}
                     <img className='w-5' src={assets.verified_icon} alt="" />
                </p>
                <div className='flex items-center gap-2 text-sm mt-1 text-gray-200'>
                    <p>{trainerInfo.qualification} - {trainerInfo.category}</p>
                    <button className='py-0.5 px-2 border text-xs rounded-full'>{trainerInfo.experience}</button>
                </div>

                {/* -----Trainer About------ */}
                <div>
                    <p className='flex items-center gap-1 text-sm font-medium text-gray-100 mt-3'>About  <BsInfoCircle/> </p>
                    <p className='text-sm text-gray-200 max-w-[700px] mt-1'>{trainerInfo.about}</p>
                </div>
                <p className='text-gray-200 font-medium mt-4'>
                    Appointment fee: <span className='text-gray-200'>{currencySymbol}{trainerInfo.fees}</span>
                </p>
            </div>
        </div>

        {/* -------Booking slots-------- */}
        <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-300'>
            <p>Booking slots</p>
            <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                {
                    trainerSlots.length && trainerSlots.map((item,index) => (
                        <div onClick={()=> setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-gray-700' : 'border border-gray-200'}`} key={index}>
                            <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))
                }
            </div>

            <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                {
                    trainerSlots.length && trainerSlots[slotIndex].map((item,index)=>(
                        <p onClick={()=> setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-gray-700' : 'border border-gray-200' }`} key={index}> 
                        {item.time.toLowerCase()}
                        </p>
                    ))
                }
            </div>
            <button onClick={bookAppointment} className='bg-primary text-gray-700 text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>
        </div>

        {/* Listing Related Trainers  */}
        <RelatedTrainers trainerId={trainerId} category={trainerInfo.category}/>
    </div>
  )
}

export default Appoinments


