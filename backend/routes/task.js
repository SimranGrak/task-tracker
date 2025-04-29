const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');

router.post('/', auth, async (req, res) => {
    const { title, description, status, projectId, completedAt } = req.body;
    try {
        const task = new Task({ title, description, status, project: projectId, completedAt });
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.get('/:projectId', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ project: req.params.projectId });
        res.json(tasks);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Task deleted' });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
