import React from "react";
import { useState } from "react";
import { Menu, X, Check, Plus, HelpCircle, XCircle } from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";

export default function HomeDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  const todayIndex = new Date().getDay() - 1;
  const [progress, setProgress] = useState(Array(7).fill("?"));

  const updateProgress = (index, status) => {
    const newProgress = [...progress];
    newProgress[index] = status;
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
      <div className="flex-1 p-4">
        {/* Menú móvil */}
        <div className="md:hidden flex justify-between items-center">
          <Button onClick={toggleMenu} variant="outline">
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Tarjeta de progreso semanal */}
        <Card>
          <div className="flex justify-between items-center">
            {days.map((day, index) => (
              <div key={index} className="text-center">
                <p className="font-bold">{day}</p>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => updateProgress(index, index === todayIndex ? "✓" : "❌")}
                >
                  {progress[index] === "✓" ? <Check /> :
                   progress[index] === "❌" ? <XCircle /> :
                   index === todayIndex ? <Plus /> : <HelpCircle />}
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
