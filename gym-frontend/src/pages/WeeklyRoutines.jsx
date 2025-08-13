import React, { useState } from 'react';
import { Dumbbell, Copy, CheckCircle, Plus, Trash2 } from 'lucide-react';

// Ejercicios personalizados de ejemplo (esto normalmente vendría de tu estado global o backend)
const userExercises = [
  { id: 'ex1', name: 'Press de Banca', muscleGroup: 'Pecho' },
  { id: 'ex2', name: 'Remo con Barra', muscleGroup: 'Espalda' },
  { id: 'ex3', name: 'Sentadilla', muscleGroup: 'Piernas' },
  { id: 'ex4', name: 'Curl Bíceps', muscleGroup: 'Bíceps' },
  { id: 'ex5', name: 'Fondos', muscleGroup: 'Tríceps' },
  { id: 'ex6', name: 'Peso Muerto', muscleGroup: 'Espalda' },
];

const routineTypes = [
  { value: 'push', label: 'Push', icon: <Dumbbell className="inline mr-1" size={18} /> },
  { value: 'pull', label: 'Pull', icon: <Dumbbell className="inline mr-1" size={18} /> },
  { value: 'legs', label: 'Legs', icon: <Dumbbell className="inline mr-1" size={18} /> },
  { value: 'fullbody', label: 'Full Body', icon: <Dumbbell className="inline mr-1" size={18} /> },
  { value: 'custom', label: 'Personalizada', icon: <Dumbbell className="inline mr-1" size={18} /> },
  { value: 'rest', label: 'Descanso', icon: <CheckCircle className="inline mr-1" size={18} /> },
];

const muscleGroups = [
  'Pecho', 'Espalda', 'Piernas', 'Hombros', 'Bíceps', 'Tríceps', 'Abdomen', 'Cardio'
];

const weekDays = [
  'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
];

const getSuggestedExercises = (routineType) => {
  switch (routineType) {
    case 'push':
      return userExercises.filter(e => ['Pecho', 'Hombros', 'Tríceps'].includes(e.muscleGroup));
    case 'pull':
      return userExercises.filter(e => ['Espalda', 'Bíceps'].includes(e.muscleGroup));
    case 'legs':
      return userExercises.filter(e => e.muscleGroup === 'Piernas');
    case 'fullbody':
      return userExercises;
    default:
      return [];
  }
};

const WeeklyRoutines = () => {
  const [week, setWeek] = useState(
    weekDays.map(() => ({
      routineType: '',
      customMuscles: [],
      exercises: [],
      isRest: false,
    }))
  );

  // Copiar rutina de otro día
  const handleCopyDay = (fromIdx, toIdx) => {
    setWeek(prev =>
      prev.map((day, idx) =>
        idx === toIdx ? { ...prev[fromIdx] } : day
      )
    );
  };

  // Cambiar tipo de rutina
  const handleRoutineTypeChange = (idx, value) => {
    setWeek(prev =>
      prev.map((day, i) =>
        i === idx
          ? {
              ...day,
              routineType: value,
              customMuscles: [],
              exercises: [],
              isRest: false,
            }
          : day
      )
    );
  };

  // Cambiar músculos en personalizada
  const handleCustomMusclesChange = (idx, muscle) => {
    setWeek(prev =>
      prev.map((day, i) =>
        i === idx
          ? {
              ...day,
              customMuscles: day.customMuscles.includes(muscle)
                ? day.customMuscles.filter(m => m !== muscle)
                : [...day.customMuscles, muscle],
              exercises: [],
            }
          : day
      )
    );
  };

  // Añadir ejercicio sugerido
  const handleAddExercise = (idx, exercise) => {
    setWeek(prev =>
      prev.map((day, i) =>
        i === idx && !day.exercises.some(e => e.id === exercise.id)
          ? { ...day, exercises: [...day.exercises, exercise] }
          : day
      )
    );
  };

  // Quitar ejercicio
  const handleRemoveExercise = (idx, exerciseId) => {
    setWeek(prev =>
      prev.map((day, i) =>
        i === idx
          ? { ...day, exercises: day.exercises.filter(e => e.id !== exerciseId) }
          : day
      )
    );
  };

  // Limpiar tarjeta (incluye quitar descanso)
  const handleClearDay = (idx) => {
    setWeek(prev =>
      prev.map((day, i) =>
        i === idx
          ? { routineType: '', customMuscles: [], exercises: [], isRest: false }
          : day
      )
    );
  };

  // Marcar como día libre
  const handleRestDay = (idx) => {
    setWeek(prev =>
      prev.map((day, i) =>
        i === idx
          ? { routineType: '', customMuscles: [], exercises: [], isRest: true }
          : day
      )
    );
  };

  return (
    <div className="p-4 md:p-8 w-full">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-400 mb-8 text-center">Planificación Semanal</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {weekDays.map((dayName, idx) => {
            const day = week[idx];
            const isRest = day.isRest;
            const isCustom = day.routineType === 'custom';
            const suggestedExercises = isCustom
              ? userExercises.filter(e => day.customMuscles.includes(e.muscleGroup))
              : getSuggestedExercises(day.routineType);

            const hasContent = day.routineType || day.customMuscles.length > 0 || day.exercises.length > 0;

            return (
              <div key={dayName} className="bg-zinc-800 rounded-2xl shadow-lg p-8 flex flex-col min-h-[520px]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-indigo-300">{dayName}</h2>
 
                </div>
                {!isRest && (
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-gray-300 mb-1">Tipo de Rutina</label>
                    <select
                      className="w-full p-3 rounded-md bg-zinc-700 border border-zinc-600 text-white focus:ring-indigo-500 focus:border-indigo-500 text-base"
                      value={day.routineType}
                      onChange={e => handleRoutineTypeChange(idx, e.target.value)}
                    >
                      <option value="">Selecciona...</option>
                      {routineTypes
                        .filter(rt => rt.value !== 'rest')
                        .map(rt => (
                          <option key={rt.value} value={rt.value}>{rt.label}</option>
                        ))}
                    </select>
                  </div>
                )}
                {isCustom && (
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-gray-300 mb-1">Grupos Musculares</label>
                    <div className="flex flex-wrap gap-2">
                      {muscleGroups.map(muscle => (
                        <button
                          key={muscle}
                          type="button"
                          className={`px-3 py-1 rounded-full text-xs font-medium border transition
                            ${day.customMuscles.includes(muscle)
                              ? 'bg-indigo-500 border-indigo-600 text-white'
                              : 'bg-zinc-700 border-zinc-600 text-gray-300 hover:bg-indigo-600 hover:text-white'}
                          `}
                          onClick={() => handleCustomMusclesChange(idx, muscle)}
                        >
                          {muscle}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {!isRest && day.routineType && (
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-gray-300 mb-1">Ejercicios Sugeridos</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {suggestedExercises.length === 0 && (
                        <span className="text-gray-400 text-xs">No hay sugerencias para esta rutina.</span>
                      )}
                      {suggestedExercises.map(ex => (
                        <button
                          key={ex.id}
                          type="button"
                          className={`flex items-center px-3 py-1 rounded-full text-xs font-medium border transition
                            ${day.exercises.some(e => e.id === ex.id)
                              ? 'bg-green-600 border-green-700 text-white'
                              : 'bg-zinc-700 border-zinc-600 text-gray-300 hover:bg-green-700 hover:text-white'}
                          `}
                          onClick={() => handleAddExercise(idx, ex)}
                          disabled={day.exercises.some(e => e.id === ex.id)}
                        >
                          <Plus size={14} className="mr-1" />
                          {ex.name}
                        </button>
                      ))}
                    </div>
                    {day.exercises.length > 0 && (
                      <div className="space-y-1">
                        {day.exercises.map(ex => (
                          <div key={ex.id} className="flex items-center justify-between bg-zinc-700 rounded-md px-3 py-1 text-sm text-white">
                            <span>{ex.name}</span>
                            <button
                              className="ml-2 text-red-400 hover:text-red-200"
                              onClick={() => handleRemoveExercise(idx, ex.id)}
                              title="Quitar ejercicio"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {isRest && (
                  <div className="flex flex-col items-center justify-center flex-1 mb-4">
                    <CheckCircle size={48} className="text-green-500 mb-2" />
                    <span className="text-xl text-green-400 font-semibold">Día de descanso</span>
                  </div>
                )}
                <div className="mt-auto flex flex-col gap-2">
                  {isRest || hasContent ? (
                    <button
                      className="w-full py-3 rounded-md text-base font-semibold bg-red-600 hover:bg-red-700 text-white transition"
                      onClick={() => handleClearDay(idx)}
                    >
                      Limpiar
                    </button>
                  ) : (
                    <button
                      className="w-full py-3 rounded-md text-base font-semibold bg-green-700 hover:bg-green-800 text-white transition"
                      onClick={() => handleRestDay(idx)}
                    >
                      Marcar como Día Libre
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeeklyRoutines;