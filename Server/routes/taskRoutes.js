const express = require('express');
const { getTasks, addTask, deleteTask, updateTaskStatus } = require('../controllers/taskController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

// Protect all routes with authentication middleware
router.get('/', protect, getTasks); // Get all tasks for the authenticated user
router.post('/', protect, addTask); // Add a new task
router.delete('/:id', protect, deleteTask); // Delete a task by ID
router.patch('/:id', protect, updateTaskStatus); // Update the status of a task by ID

module.exports = router;
