const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Link task to a user
});

module.exports = mongoose.model('Task', taskSchema);
