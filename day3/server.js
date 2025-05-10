const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let todos = [
  { id: 1, task: 'Learn Node.js' },
  { id: 2, task: 'Build Todo API' },
  { id: 3, task: 'dfsfaf'},
  { id: 4, task: 'Learn' },
  { id: 5, task: 'stry' },
];

// GET: Fetch all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// POST: Add a new todo
app.post('/todos', (req, res) => {
  const newTodo = req.body;
  newTodo.id = todos.length + 1;
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT: Update an existing todo
app.put('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const updatedTodo = req.body;

  const todoIndex = todos.findIndex((todo) => todo.id === todoId);
  if (todoIndex !== -1) {
    todos[todoIndex] = { ...todos[todoIndex], ...updatedTodo };
    res.json(todos[todoIndex]);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// DELETE: Remove a todo
app.delete('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

app.listen(port, () => {
  console.log(`Todo API is running at http://localhost:${port}`);
});
app.get('/', (req, res) => {
    res.send('Welcome to the Todo API! Use /todos to interact with the Todo list.');
  });