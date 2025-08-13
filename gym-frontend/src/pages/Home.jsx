import React from "react";
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  PlusCircle,
  TrendingUp,
  Target,
  Clock,
  Dumbbell,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  const progressData = [
    { day: "Lun", status: "completed" },
    { day: "Mar", status: "add" },
    { day: "Mié", status: "pending" },
    { day: "Jue", status: "pending" },
    { day: "Vie", status: "not_done" },
    { day: "Sáb", status: "pending" },
    { day: "Dom", status: "pending" },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 size={24} className="text-green-500" />;
      case "not_done":
        return <XCircle size={24} className="text-red-500" />;
      case "add":
        return <PlusCircle size={24} className="text-blue-500" />;
      case "pending":
      default:
        return <HelpCircle size={24} className="text-gray-500" />;
    }
  };

  return (
    // Envolvemos todo en un div que use flex col para asegurar el orden vertical
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold mb-8 text-white">Dashboard</h1>

      {/* Grid para las tarjetas */}
      {/* Ajustamos para mejor responsividad: 1 columna por defecto, 2 en md, 3 en lg */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Tarjeta 1: Progreso Semanal */}
        {/* En md ocupará 2 columnas, en lg también 2 columnas (para dejar espacio a Métricas) */}
        {/* Si quieres que en md ocupe todo el ancho, sería md:col-span-2 */}
        <div className="md:col-span-2 lg:col-span-2 bg-zinc-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-indigo-400">
            Progreso Semanal
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 text-center">
            {progressData.map((item, index) => (
              <div
                key={index}
                className="bg-zinc-700 p-3 rounded-lg flex flex-col items-center justify-between cursor-pointer hover:bg-zinc-600 transition-colors"
              >
                <span className="text-sm font-medium text-gray-300">
                  {item.day}
                </span>
                <div className="my-2">{getStatusIcon(item.status)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tarjeta 2: Métricas Rápidas */}
        {/* En md ocupará todo el ancho de su columna (col-span-1 por defecto si no se especifica) */}
        {/* En lg también ocupará 1 columna */}
        <div className="bg-zinc-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-6 text-indigo-400">
            Métricas Rápidas
          </h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <Target size={24} className="mr-3 text-green-500" />
              <div>
                <p className="text-sm text-gray-400">Objetivos cumplidos</p>
                <p className="text-lg font-bold">4/5</p>
              </div>
            </div>
            <div className="flex items-center">
              <Dumbbell size={24} className="mr-3 text-red-500" />
              <div>
                <p className="text-sm text-gray-400">Peso total levantado</p>
                <p className="text-lg font-bold">22,500 kg</p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock size={24} className="mr-3 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-400">Promedio de duración</p>
                <p className="text-lg font-bold">58 min</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tarjeta 3: Último Ejercicio Registrado */}
        {/* En md ocupará 2 columnas (todo el ancho de esa fila) */}
        {/* En lg ocupará 3 columnas (todo el ancho de esa fila) */}
        <div className="md:col-span-2 lg:col-span-3 bg-gradient-to-br from-indigo-700 to-purple-800 p-6 rounded-xl shadow-2xl border border-purple-600">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold text-white">
                Último Ejercicio Registrado
                </h2>
                <Sparkles size={24} className="text-yellow-300" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center md:text-left">
                <div>
                    <p className="text-sm text-indigo-200">Ejercicio</p>
                    <p className="text-lg font-bold text-white">Press de Banca</p>
                </div>
                <div>
                    <p className="text-sm text-indigo-200">Series</p>
                    <p className="text-lg font-bold text-white">3</p>
                </div>
                <div>
                    <p className="text-sm text-indigo-200">Reps</p>
                    <p className="text-lg font-bold text-white">8</p>
                </div>
                <div>
                    <p className="text-sm text-indigo-200">Peso</p>
                    <p className="text-lg font-bold text-white">80 kg</p>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-indigo-500 flex items-center">
                <TrendingUp size={20} className="mr-2 text-green-400" />
                <p className="text-sm text-green-300">
                <span className="font-semibold">+5 kg</span> esta semana vs anterior
                </p>
            </div>
          </div>
      </div>
    </div>
  );
}