import React from "react";
import { useState } from "react";
import { Menu, X, Check, HelpCircle, XCircle } from "lucide-react"; // Removed Plus
import Card, { CardContent, CardHeader, CardTitle } from "../components/Card";
import Button from "../components/Button";

export default function HomeDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  // Adjust todayIndex: Monday = 0, ..., Sunday = 6
  const todayIndex = (new Date().getDay() + 6) % 7; 
  const [progress, setProgress] = useState(Array(7).fill("?"));

  const handleDayClick = (index) => {
    const newProgress = [...progress];
    const currentStatus = newProgress[index];
    if (currentStatus === "?") {
      newProgress[index] = "✓";
    } else if (currentStatus === "✓") {
      newProgress[index] = "x";
    } else {
      newProgress[index] = "?";
    }
    setProgress(newProgress);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar (solo en tablet/PC) */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold">Menú</h2>
        <nav className="mt-4">
          <ul>
            <li><Button variant="ghost">🏠 Inicio</Button></li>
            <li><Button variant="ghost">📊 Progreso</Button></li>
            <li><Button variant="ghost">⚙ Configuración</Button></li>
          </ul>
        </nav>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 p-4 flex flex-col items-center"> {/* Centering the card */}
        {/* Menú móvil */}
        <div className="md:hidden flex justify-between items-center mb-4 w-full md:w-3/4 lg:w-1/2"> {/* Ensure mobile menu aligns with card width */}
          <Button onClick={toggleMenu} variant="outline">
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        <Card className="w-full md:w-3/4 lg:w-1/2 mt-8"> {/* Responsive width and top margin */}
          <CardHeader>
            <CardTitle>Progreso Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {days.map((day, index) => (
                <div
                  key={index}
                  onClick={() => handleDayClick(index)}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    index === todayIndex ? "bg-gray-100 dark:bg-gray-700 font-semibold" : ""
                  }`}
                >
                  <span>{day}</span>
                  {progress[index] === "?" && <HelpCircle className="text-gray-500" />}
                  {progress[index] === "✓" && <Check className="text-green-500" />}
                  {progress[index] === "x" && <XCircle className="text-red-500" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
