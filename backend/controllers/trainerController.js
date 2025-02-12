import trainerModel from '../models/trainerModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'


//API to change availability
const changeAvailability = async (req,res) => {
    
    try {
        
        const {trainerId} = req.body

        const  trainerData = await trainerModel.findById(trainerId)
        await trainerModel.findByIdAndUpdate(trainerId,{available: !trainerData.available})
        res.json({success:true,message:'Availability Changed'})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}


const trainerList = async (req,res) => {
    try {
        const trainers = await trainerModel.find({}).select(['-password','-email'])
        res.json({success:true,trainers})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//API for trainer login
const loginTrainer = async (req,res) => {
    
    try {
        
        const { email,password } = req.body
        const trainer = await trainerModel.findOne({email})

        if(!trainer){
            return res.json({success:false,message:'Invalid credentials'})
        }

        const isMatch = await bcrypt.compare(password,trainer.password)

        if (isMatch) {
            
            const token = jwt.sign({id:trainer._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            return res.json({success:false,message:'Invalid credentials'})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//API  to get trainer appointments for trainer panel
const appointmentsTrainer = async (req,res) => {
    
    try {
        
        const { trainerId } = req.body
        const appointments = await appointmentModel.find({trainerId})

        res.json({success:true, appointments})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//API to mark appointment completed for trainer panel
const appointmentComplete = async (req,res) => {
    
    try {
        
        const {trainerId,appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if(appointmentData && appointmentData.trainerId === trainerId){

            await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted: true})
            return res.json({success:true,message:'Appointment Completed'})
        }else{
            return res.json({success:false,message:'Mark Failed'})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}


//API to cancel appointment for trainer panel
const appointmentCancel = async (req,res) => {
    
    try {
        
        const {trainerId,appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if(appointmentData && appointmentData.trainerId === trainerId){

            await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})
            return res.json({success:true,message:'Appointment Cancelled'})
        }else{
            return res.json({success:false,message:'Cancellation Failed'})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//API to get dashboard data for trainer panel
const trainerDashboard = async (req,res) => {
    try {

        const {trainerId} = req.body

        const appointments = await appointmentModel.find({trainerId})

        let earnings = 0

        appointments.map((item)=>{
            if(item.isCompleted || item.payment ){
                earnings += item.amount
            }
        })

        let clients = []

        appointments.map((item)=>{
            if(!clients.includes(item.userId)){
                clients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            clients: clients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success:true, dashData})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//API to get trainer profile for Trainer Panel
const trainerProfile = async (req,res) => {
    try {

        const {trainerId} = req.body
        const profileData = await trainerModel.findById(trainerId).select('-password')

        res.json({success:true,profileData})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//API to update trainer profile data from Trainer Panel
const updateTrainerProfile = async (req,res) => {
    
    try {

        const {trainerId,fees,address,available} = req.body

        await trainerModel.findByIdAndUpdate(trainerId,{fees,address,available})

        res.json({success:true, message:'Profile Updated'})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {changeAvailability,trainerList,loginTrainer,appointmentsTrainer,appointmentCancel,appointmentComplete, trainerDashboard,trainerProfile,updateTrainerProfile}