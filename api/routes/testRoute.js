import express from 'express';
import {
  createTest,
  deleteTest,
  getTest,
  getTests,
  getTestsById,
  updateTest,
} from '../controller/testController.js';

const router = express.Router();

router.post('/:lessonid', createTest);
// router.patch("/:testId", addQuestion);
router.put('/:id', updateTest);
router.get('/', getTests);
router.get('/find/:id', getTest);
router.get('/find-all/:id', getTestsById);
router.delete('/:id', deleteTest);

export default router;
