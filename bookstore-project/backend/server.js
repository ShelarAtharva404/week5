const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

// Initialize app
const app = express();

// ======= MIDDLEWARE =======
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // HTTP request logger

// ======= DATABASE =======
mongoose.connect('mongodb://localhost:27017/bookstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// ======= MODEL =======
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  year: Number
});

const Book = mongoose.model('Book', bookSchema);

// ======= ROUTES =======

// POST - Create
app.post('/api/books', async (req, res, next) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
});

// GET - Read all
app.get('/api/books', async (req, res, next) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    next(err);
  }
});

// PUT - Update by ID
app.put('/api/books/:id', async (req, res, next) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Book not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE - Remove by ID
app.delete('/api/books/:id', async (req, res, next) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Book not found' });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// ======= 404 MIDDLEWARE =======
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// ======= ERROR HANDLING MIDDLEWARE =======
app.use((err, req, res, next) => {
  console.error('💥 Server Error:', err.message);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// ======= START SERVER =======
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
