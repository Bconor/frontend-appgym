import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    return (
      <div>
        <h1 className="text-3xl font-bold">Bienvenido al Gym Tracker</h1>
        <p>Aquí puedes gestionar tus ejercicios y ver tu progreso.</p>
      </div>
    );
  };
  
  export default Home;