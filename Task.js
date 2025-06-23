const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true }, // for calendar selection
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date } // optional
});

module.exports = mongoose.model('Task', TaskSchema);
