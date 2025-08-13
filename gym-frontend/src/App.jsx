
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importa el nuevo Layout y tus páginas
import LayoutWithSidebar from './layouts/LayoutWithSidebar'; // <-- Importa el Layout
import Home from './pages/Home';
import Progress from './pages/ProgressChart'; // O el nombre correcto de tu archivo de progreso
import Login from './pages/Login';
import SignUp from './pages/SignUp';7
import VerifyEmail from './pages/VerifyEmail'
import ManageExercises from './pages/ManageExercises';
import WeeklyRoutines from './pages/WeeklyRoutines';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas sin Layout con Sidebar (ej. Login, SignUp) */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        {/* ... otras rutas sin Sidebar ... */}

        {/* Rutas que usarán el Layout con Sidebar */}
        <Route
          path="/home"
          element={
            <LayoutWithSidebar> {/* Envuelve la página con el Layout */}
              <Home /> {/* Pasa el componente Home como children */}
            </LayoutWithSidebar>
          }
        />
         <Route
          path="/progress"
          element={
            <LayoutWithSidebar> {/* Envuelve la página con el Layout */}
              <Progress /> {/* Pasa el componente Progress como children */}
            </LayoutWithSidebar>
          }
        />
         <Route
         path="/verify-email"
         element={<VerifyEmail />
             }
         />
         <Route
         path="/manage-exercises"
         element={<LayoutWithSidebar>
          <ManageExercises />
         </LayoutWithSidebar>
             }
         />
          <Route
          path="/weekly-progress"
          element={
            <LayoutWithSidebar> {/* Envuelve la página con el Layout */}
              <WeeklyRoutines /> {/* Pasa el componente WeeklyProgress como children */}
            </LayoutWithSidebar>
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;