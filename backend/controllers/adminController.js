import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary} from 'cloudinary'
import trainerModel from '../models/trainerModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'

// API for adding trainer
const addTrainer = async (req,res) => {
    try {
        const { name, email, password, category, qualification, experience, about, fees, address } = req.body
        const imageFile = req.file

        //checking for all data to add trainer
        if(!name || !email || !password || !category || !qualification || !experience || !about || !fees || !address ){
            return ({success:false,message:"Missing Details"})
        }
        
        //validating email format
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }

        //validating strong password
        if(password.length < 8){
            return res.json({success:false,message:"Please enter a stong password"})
        }

        //hashing trainer password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})
        const imageUrl = imageUpload.secure_url

        const trainerData = {
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            category,
            qualification,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newTrainer = new trainerModel(trainerData)
        await newTrainer.save()

        res.json({success:true,message:"Trainer Added"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}


//API for Admin login
const loginAdmin = async (req,res) => {
    try {
        const {email,password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
            
        }else{
            res.json({success:false,message:"invalid credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}


//API to get all trainers list for admin panel
const allTrainers = async (req,res) => {
    try {
        
        const trainers = await trainerModel.find({}).select('-password')
        res.json({success:true,trainers})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}


//API to get all appointments list
const appointmentsAdmin = async (req,res) => {
    
    try {
        
        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}


//API for appointment cancellation
const appointmentCancel = async (req,res) => {
    
    try {
        
        const {appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

        // releasing trainer slot

        const {trainerId,slotDate,slotTime} = appointmentData
        
        const trainerData = await trainerModel.findById(trainerId)

        let slots_booked = trainerData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await trainerModel.findByIdAndUpdate(trainerId,{slots_booked})

        res.json({success:true,message:'Appointment Cancelled'})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}


//API to get dashboard data for admin panel
const adminDashboard = async (req,res) => {
    
    try {

        const trainers = await trainerModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            trainers: trainers.length,
            appointments: appointments.length,
            clients: users.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success:true,dashData})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
 
export  { addTrainer, loginAdmin, allTrainers, appointmentsAdmin, appointmentCancel, adminDashboard }
