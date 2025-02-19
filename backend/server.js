const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// File path for tasks
const tasksFilePath = path.join(__dirname, 'tasks.json');

// Read tasks from file
const readTasks = () => {
  const data = fs.readFileSync(tasksFilePath);
  return JSON.parse(data);
};

// Write tasks to file
const writeTasks = (tasks) => {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
};

// API Routes
// Get all tasks
app.get('/api/tasks', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// Add a new task
app.post('/api/tasks', (req, res) => {
  const tasks = readTasks();
  const newTask = {
    id: Date.now(),
    text: req.body.text,
  };
  tasks.push(newTask);
  writeTasks(tasks);
  res.json(newTask);
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const taskId = parseInt(req.params.id);
  const updatedTasks = tasks.filter((task) => task.id !== taskId);
  writeTasks(updatedTasks);
  res.json({ message: 'Task deleted successfully' });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});