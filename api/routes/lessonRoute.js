import express from 'express'
import { createLesson, deleteLesson, getLesson, getLessons, updateLesson } from '../controller/lessonController.js'

const router = express.Router()

router.post('/', createLesson)
router.get('/', getLessons)
router.put('/:id', updateLesson)
router.delete('/:id', deleteLesson)
router.get('/find/:id', getLesson)

export default router