const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Add new task
router.post('/', async (req, res) => {
  const { title, date } = req.body;
  const task = new Task({ title, date });
  await task.save();
  res.json(task);
});

// Toggle completion
router.put('/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.completed = !task.completed;
  await task.save();
  res.json(task);
});

// Delete task
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;

router.put('/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.completed = !task.completed;
  task.completedAt = task.completed ? new Date() : null; // Set or clear
  await task.save();
  res.json(task);
});

// Edit task title
router.patch('/:id', async (req, res) => {
  const { title } = req.body;
  const task = await Task.findById(req.params.id);
  if (title) task.title = title;
  await task.save();
  res.json(task);
});
