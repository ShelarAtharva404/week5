const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// CREATE
router.post('/', async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.json(book);
});

// READ ALL
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
