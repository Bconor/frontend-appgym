import React from 'react';
import { Plus, HelpCircle, Check, X } from "lucide-react";

const WeeklyProgress = ({ progress }) => {
  const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  const getIcon = (status) => {
    switch (status) {
      case "pending":
        return <HelpCircle className="text-yellow-500" />;
      case "done":
        return <Check className="text-green-500" />;
      case "skipped":
        return <X className="text-red-500" />;
      default:
        return <Plus className="text-blue-500" />;
    }
  };

  return (
    <div className="flex justify-between bg-gray-900 p-4 rounded-lg">
      {days.map((day, index) => (
        <div key={index} className="flex flex-col items-center">
          <span className="text-white">{day}</span>
          <div className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full">
            {getIcon(progress[index] || "add")}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyProgress;
