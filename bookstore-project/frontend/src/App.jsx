import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', year: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/books');
      setBooks(res.data);
    } catch (err) {
      console.error('❌ Error fetching books:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const res = await axios.put(`http://localhost:5000/api/books/${editId}`, form);
        setBooks(books.map(b => (b._id === editId ? res.data : b)));
        setEditId(null);
      } else {
        const res = await axios.post('http://localhost:5000/api/books', form);
        setBooks([...books, res.data]);
      }
      setForm({ title: '', author: '', year: '' });
    } catch (err) {
      console.error('❌ Error submitting form:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      setBooks(books.filter(book => book._id !== id));
    } catch (err) {
      console.error('❌ Error deleting book:', err);
    }
  };

  const handleEdit = (book) => {
    setForm({ title: book.title, author: book.author, year: book.year });
    setEditId(book._id);
  };

  return (
    <div className="container">
      <header>
        <h1>📚 Bookstore Manager</h1>
      </header>

      <form className="book-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={form.author}
          onChange={e => setForm({ ...form, author: e.target.value })}
          required
        />
       

<select
  value={form.year}
  onChange={e => setForm({ ...form, year: e.target.value })}
  required
>
  <option value="">Select Year</option>
  {Array.from({ length: new Date().getFullYear() - 1949 }, (_, i) => {
    const year = 1950 + i;
    return (
      <option key={year} value={year}>
        {year}
      </option>
    );
  })}
</select>

        <button type="submit">{editId ? 'Update Book' : 'Add Book'}</button>
      </form>

      <div className="book-list">
        {books.map(book => (
          <div className="book-card" key={book._id}>
            <div className="book-info">
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Year:</strong> {book.year}</p>
            </div>
            <div className="book-actions">
              <button onClick={() => handleEdit(book)}>✏️ Edit</button>
              <button onClick={() => handleDelete(book._id)}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>

      <footer>
        <p>© 2025 Bookstore Project. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
