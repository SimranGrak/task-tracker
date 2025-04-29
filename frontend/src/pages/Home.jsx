// src/pages/Home.jsx
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Task Tracker</h1>
      <p className="mb-8 text-lg text-gray-600">Track your project tasks easily.</p>

      <div className="space-x-4">
        <Link to="/login">
          <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
