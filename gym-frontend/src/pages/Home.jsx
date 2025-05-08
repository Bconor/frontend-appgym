import React from "react";
import { useState } from "react";
import { Menu, X, Check, Plus, HelpCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "../components/Card";
import  Button  from "../components/Button";

export default function HomeDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [weekData, setWeekData] = useState([
    { day: "Lunes", status: "add" },
    { day: "Martes", status: "pending" },
    { day: "Miércoles", status: "checked" },
    { day: "Jueves", status: "none" },
    { day: "Viernes", status: "add" },
    { day: "Sábado", status: "pending" },
    { day: "Domingo", status: "checked" },
  ]);

  const renderIcon = (status) => {
    switch (status) {
      case "add":
        return <Plus className="text-green-500" size={20} />;
      case "pending":
        return <HelpCircle className="text-yellow-500" size={20} />;
      case "checked":
        return <Check className="text-blue-500" size={20} />;
      case "none":
        return <XCircle className="text-red-500" size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      {/* Menú superior para móviles */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <Button variant="ghost" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Tarjeta semanal */}
      <Card className="p-4 shadow-md">
        <h2 className="text-lg font-semibold mb-2">Semana Actual</h2>
        <div className="flex justify-between">
          {weekData.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-sm font-medium">{day.day}</span>
              {renderIcon(day.status)}
            </div>
          ))}
        </div>
      </Card>

      {/* Resumen de progreso */}
      <Card className="mt-4 p-4 shadow-md">
        <h2 className="text-lg font-semibold mb-2">Resumen de Progreso</h2>
        <p className="text-sm text-gray-600">Tu progreso de la semana en base a tus entrenamientos.</p>
      </Card>
    </div>
  );
}
