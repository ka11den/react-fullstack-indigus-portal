import express from 'express'
import { 
  createNew, 
  deleteNew, 
  getNew, 
  getNews, 
  updateNew,
}
from '../controller/newController.js'

const router = express.Router()

router.post('/', createNew)
router.put('/:id', updateNew)
router.get('/find/:id', getNew)
router.get('/', getNews)
router.delete('/:id', deleteNew)

export default router