import express from 'express'
import { deleteModel } from 'mongoose'
import { 
  createMaterial,
  getMaterial,
  getMaterials, 
  updateMaterial 
} from '../controller/materialController.js'

const router = express.Router()

router.post('/', createMaterial)
router.put('/:id', updateMaterial)
router.get('/', getMaterials)
router.get('/find/:id', getMaterial)
router.delete('/:id', deleteModel)

export default router