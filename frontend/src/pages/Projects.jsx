import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

function Projects() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ title: '', description: '', status: 'Pending' });

  useEffect(() => {
    API.get(`/tasks/${projectId}`).then(res => setTasks(res.data));
  }, [projectId]);

  const addTask = async (e) => {
    e.preventDefault();
    const res = await API.post('/tasks', { ...task, projectId });
    setTasks([...tasks, res.data]);
    setTask({ title: '', description: '', status: 'Pending' });
  };

  const updateTask = async (id, updates) => {
    const res = await API.put(`/tasks/${id}`, updates);
    setTasks(tasks.map(t => (t._id === id ? res.data : t)));
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Tasks</h2>
      <form onSubmit={addTask} className="mb-4 grid grid-cols-4 gap-2">
        <input
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          placeholder="Title"
          className="border px-2 py-1 rounded"
          required
        />
        <input
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          placeholder="Description"
          className="border px-2 py-1 rounded"
        />
        <select
          value={task.status}
          onChange={(e) => setTask({ ...task, status: e.target.value })}
          className="border px-2 py-1 rounded"
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <button className="bg-green-500 text-white px-4 py-2 rounded">Add Task</button>
      </form>
      <ul>
        {tasks.map(t => (
          <li key={t._id} className="bg-gray-100 p-3 mb-2 rounded flex justify-between">
            <div>
              <h4 className="font-bold">{t.title}</h4>
              <p>{t.description}</p>
              <p className="text-sm text-gray-600">Status: {t.status}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => updateTask(t._id, { status: 'Completed' })} className="bg-blue-500 text-white px-2 py-1 rounded">Complete</button>
              <button onClick={() => deleteTask(t._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;
