const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
    completedAt: Date,
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
});
module.exports = mongoose.model('Task', taskSchema);