import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    tag,
    search = '',
  } = req.query;
const currentPage = Number(page);
  const currentPerPage = Number(perPage);
  
  const filter = {};

  if (tag) {
    filter.tag = tag;
  }

  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        content: {
          $regex: search,
          $options: 'i',
        },
      },
    ];
  }

  const skip = (currentPage - 1) * currentPerPage;

  const [notes, totalNotes] = await Promise.all([
    Note.find(filter)
      .skip(skip)
      .limit(currentPerPage),
    Note.countDocuments(filter),
  ]);

 const totalPages = Math.ceil(totalNotes / currentPerPage);

  res.status(200).json({
   page: currentPage,
perPage: currentPerPage,
    totalNotes,
    totalPages,
    notes,
  });
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findById(noteId);

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
  const note = await Note.create(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a note!',
    data: note,
  });
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findByIdAndDelete(noteId);

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

  const note = await Note.findByIdAndUpdate(noteId, req.body, {
  returnDocument: 'after',
});

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated a note!',
    data: note,
  });
};