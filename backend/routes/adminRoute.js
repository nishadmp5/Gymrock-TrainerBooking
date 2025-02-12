import express from 'express'
import { addTrainer, allTrainers, loginAdmin,appointmentsAdmin, appointmentCancel,adminDashboard } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/trainerController.js'

const adminRouter = express.Router()

adminRouter.post('/add-trainer',authAdmin,upload.single('image'),addTrainer)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-trainers',authAdmin,allTrainers)
adminRouter.post('/change-availability',authAdmin,changeAvailability)
adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)

export default adminRouter