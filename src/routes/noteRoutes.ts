import express from 'express';
import * as noteController from '../controllers/noteController';

const router = express.Router();

router.get('/', noteController.getNotes);
router.post('/', noteController.addNote);
router.get('/:id', noteController.getNoteById);
router.delete('/id', noteController.removeNote);
router.put('/:id', noteController.updateNote);
router.post('/:id/complete', noteController.complete);
router.post('/:id/unComplete', noteController.unComplete);

export default router;
