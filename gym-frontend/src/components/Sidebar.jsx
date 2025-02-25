import { Link } from 'react-router-dom';
import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold">Gym Tracker</h1>
      <nav className="mt-4">
        <Link to="/home" className="block py-2 hover:bg-gray-700">Inicio</Link>
        <Link to="/progress" className="block py-2 hover:bg-gray-700">Progreso</Link>
      </nav>
    </div>
  );
};

export default Sidebar;