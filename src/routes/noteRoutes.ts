import express, { RequestHandler } from 'express';
import notesController from '../controllers/noteController';
const router = express.Router();

router.get('/', notesController.myController as RequestHandler);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
// router.get('/:id', notesController.getNoteById);
// router.post('/', notesController.addNote);
// router.delete('/:id', notesController.removeNote);
// router.put('/:id', notesController.updateNote);
// router.post('/:id/complete', notesController.complete);
// router.post('/:id/unComplete', notesController.unComplete);

export default router;
