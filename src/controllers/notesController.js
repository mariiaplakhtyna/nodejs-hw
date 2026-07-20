import createHttpError from 'http-errors';
import {
  getAllNotes,
  getNoteById,
  createNote as createNoteService,
  deleteNote as deleteNoteService,
  updateNote as updateNoteService,
} from '../services/notes.js';

export const getNotesController = async (req, res) => {
  const notes = await getAllNotes();

  res.status(200).json({
    status: 200,
    message: 'Successfully found notes!',
    data: notes,
  });
};

export const getNoteByIdController = async (req, res) => {
  const { noteId } = req.params;

  const note = await getNoteById(noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found note with id ${noteId}!`,
    data: note,
  });
};

export const createNote = async (req, res) => {
  const note = await createNoteService(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a note!',
    data: note,
  });
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;

  const note = await deleteNoteService(noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully deleted a note!',
    data: note,
  });
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;

  const note = await updateNoteService(noteId, req.body);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated a note!',
    data: note,
  });
};