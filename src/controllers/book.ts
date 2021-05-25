import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Book from '../models/book';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  let { author, title } = req.body;

  const book = new Book({
    author,
    title,
  });

  try {
    const result = await book.save();
    return res.status(201).json({ result });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await Book.find();
    return res.status(200).json({
      books: result,
      count: result.length,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

export default { createBook, getAllBooks };
