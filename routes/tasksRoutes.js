const express = require('express');
const {
    getTasks,
    createTask,
    updateTask,
    deleteTask, getTask,
} = require('../controllers/taskController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router
    .route('/')
    .get(protect, getTasks)
    .post(protect, createTask);

router
    .route('/:id')
    .get(protect, getTask)
    .patch(protect, updateTask)
    .delete(protect, deleteTask);

module.exports = router;


