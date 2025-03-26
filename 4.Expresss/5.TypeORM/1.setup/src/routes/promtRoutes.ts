import express from 'express'
import { generateQuestions } from '../controllers/generateController'


//router
const router = express.Router()

//create a new post
router.post('/get',generateQuestions) 

export default router