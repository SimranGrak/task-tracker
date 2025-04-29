import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/projects').then(res => setProjects(res.data));
  }, []);

  const createProject = async (e) => {
    e.preventDefault();
    const res = await API.post('/projects', { title });
    setProjects([...projects, res.data]);
    setTitle('');
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Projects</h2>
      <form onSubmit={createProject} className="mb-4 flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project title"
          className="border px-4 py-2 rounded w-1/2"
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Project</button>
      </form>
      <ul>
        {projects.map((project) => (
          <li
            key={project._id}
            className="p-2 bg-gray-200 rounded mb-2 cursor-pointer"
            onClick={() => navigate(`/projects/${project._id}`)}
          >
            {project.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
