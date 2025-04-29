const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Project = require('../models/Project');

router.post('/', auth, async (req, res) => {
    try {
        const projectCount = await Project.countDocuments({ user: req.user.id });
        if (projectCount >= 4) return res.status(400).json({ msg: 'Maximum 4 projects allowed' });

        const project = new Project({ title: req.body.title, user: req.user.id });
        await project.save();
        res.json(project);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const projects = await Project.find({ user: req.user.id });
        res.json(projects);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;