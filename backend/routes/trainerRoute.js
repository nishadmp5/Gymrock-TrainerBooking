import express from 'express'
import { trainerList, loginTrainer, appointmentsTrainer, appointmentComplete, appointmentCancel,trainerDashboard, trainerProfile, updateTrainerProfile } from '../controllers/trainerController.js'
import authTrainer from '../middlewares/authTrainer.js'

const trainerRouter = express.Router()

trainerRouter.get('/list',trainerList)
trainerRouter.post('/login',loginTrainer)
trainerRouter.get('/appointments',authTrainer,appointmentsTrainer)
trainerRouter.post('/complete-appointment',authTrainer,appointmentComplete)
trainerRouter.post('/cancel-appointment',authTrainer,appointmentCancel)
trainerRouter.get('/dashboard',authTrainer,trainerDashboard)
trainerRouter.get('/profile',authTrainer,trainerProfile)
trainerRouter.post('/update-profile',authTrainer,updateTrainerProfile)


export default trainerRouter