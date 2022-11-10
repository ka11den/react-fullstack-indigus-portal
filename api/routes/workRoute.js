import express from 'express'
import {
  createWork,
  updateWork,
  getWork,
  getWorks,
  deleteWork,
  getWorksByLessonId,
} from '../controller/workController.js'

const router = express.Router()

router.post('/:lessonid', createWork)
router.put('/:id', updateWork)
router.get('/find/:id', getWork)
router.get('/find-by-lesson/:id', getWorksByLessonId)
router.delete('/:id', deleteWork)
router.get('/', getWorks)

export default router
