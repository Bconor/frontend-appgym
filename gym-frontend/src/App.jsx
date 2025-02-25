import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Progress from './pages/ProgressChart';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <Router>
      <div className="flex">
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Login />} /> {/* Ruta principal */}
            <Route path="/home" element={<Home />} /> {/* Ruta para la página de inicio */}
            <Route path="/progress" element={<Progress />} /> {/* Ruta para la página de progreso */}
            <Route path="/register" element={<SignUp />} /> {/* Ruta para la página de registro */}
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;