const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todos');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/api/todos', todoRoutes);

// MongoDB Local URI
const MONGO_URI = 'mongodb://127.0.0.1:27017/tododb';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB Connected');
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
})
.catch((err) => console.error('❌ MongoDB Error:', err));
app.get('/', (req, res) => {
    res.send('🎉 Todo API is running! Use /api/todos to interact.');
  });
  