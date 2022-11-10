import express from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  toggleGroup,
  updateUser,
  getProfile,
} from '../controller/userController.js';

const router = express.Router();

router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id', getUser);
router.get('/', getUsers);
router.get('/profile', getProfile);
router.post('/toggle-group', toggleGroup);

export default router;