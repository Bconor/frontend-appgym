import React from "react";
// src/components/Dashboard.jsx
import { BarChart, Dumbbell, Target } from "lucide-react";

const Dashboard = ({ avgWeight, goalsCompleted }) => {
  return (
    <div className="grid grid-cols-3 gap-4 bg-gray-800 p-4 rounded-lg text-white">
      <div className="flex flex-col items-center">
        <Dumbbell className="text-blue-400" />
        <p className="text-lg">{avgWeight} kg</p>
        <span>Peso Promedio</span>
      </div>
      <div className="flex flex-col items-center">
        <Target className="text-green-400" />
        <p className="text-lg">{goalsCompleted}</p>
        <span>Objetivos Cumplidos</span>
      </div>
      <div className="flex flex-col items-center">
        <BarChart className="text-yellow-400" />
        <p className="text-lg">Ver más</p>
        <span>Progreso</span>
      </div>
    </div>
  );
};

export default Dashboard;
