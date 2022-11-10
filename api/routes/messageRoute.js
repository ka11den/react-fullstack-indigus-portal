import express from 'express'
import { getMessage, sendMessage } from '../controller/messageController.js'

const router = express.Router()

router.post('/addmsg', sendMessage)
router.post('/getmsg', getMessage)

export default router