import express from 'express'
import {
  createSchedules,
  deleteSchedules,
  getSchedule,
  getSchedules,
  updateSchedules,
  clearSchedules,
} from '../controller/schedulesController.js'

const router = express.Router()

router.post('/:groupid', createSchedules)
router.put('/:id', updateSchedules)
router.get('/find/:title', getSchedule)
router.get('/', getSchedules)
router.delete('/:id', deleteSchedules)
router.get('/clear', clearSchedules)

export default router
