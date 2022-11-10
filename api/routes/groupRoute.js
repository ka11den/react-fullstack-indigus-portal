import express from 'express';
import {
  addLesson,
  create,
  getAll,
  getById,
  removeCollection,
  update,
} from '../controller/groupController.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/create', create);
router.put('/update/:groupId', update);
router.put('/add-lesson/:groupId', addLesson);

router.get('/clear', removeCollection);

export default router;