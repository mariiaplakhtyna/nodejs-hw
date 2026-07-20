import { Router } from 'express';
import {
  getNotesController,
  getNoteByIdController,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';

const router = Router();

router.get('/', getNotesController);
router.get('/:noteId', getNoteByIdController);
router.post('/', createNote);
router.delete('/:noteId', deleteNote);
router.patch('/:noteId', updateNote);

export default router;