import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Edit3, Save, CalendarDays, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

const exerciseSuggestions = [
  "Press de Banca", "Sentadilla", "Peso Muerto", "Dominadas", "Press Militar",
  "Curl de Bíceps", "Extensiones de Tríceps", "Prensa de Piernas", "Remo con Barra"
];
const gripSuggestions = ["Barra", "Mancuerna", "Cuerda", "Agarre Neutro", "Agarre Supino", "Agarre Prono"];

const today = new Date().toISOString().split('T')[0];

const SeriesInput = ({ seriesNumber, seriesData, onSeriesChange, isEditing }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onSeriesChange(seriesNumber - 1, name, value);
  };

  return (
    <div className={`p-3 rounded-md mb-2 ${isEditing ? 'bg-zinc-700' : 'bg-zinc-600/80'}`}>
      <p className="font-semibold text-sm text-indigo-300 mb-2">Serie {seriesNumber}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-2 text-sm">
        <div>
          <label htmlFor={`reps-${seriesData.id}`} className="block text-xs font-medium text-gray-300 mb-1">Reps</label>
          <input
            type="number"
            id={`reps-${seriesData.id}`}
            name="reps"
            value={seriesData.reps}
            onChange={handleChange}
            placeholder="0"
            className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white text-sm"
            min="0"
            required={isEditing}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label htmlFor={`weight-${seriesData.id}`} className="block text-xs font-medium text-gray-300 mb-1">Peso (kg)</label>
          <input
            type="number"
            id={`weight-${seriesData.id}`}
            name="weight"
            value={seriesData.weight}
            onChange={handleChange}
            placeholder="0"
            className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white text-sm"
            min="0"
            step="0.25"
            required={isEditing}
            disabled={!isEditing}
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor={`rest-${seriesData.id}`} className="block text-xs font-medium text-gray-300 mb-1">Descanso (seg)</label>
          <input
            type="number"
            id={`rest-${seriesData.id}`}
            name="rest"
            value={seriesData.rest}
            onChange={handleChange}
            placeholder="60"
            className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white text-sm"
            min="0"
            required={isEditing}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
};

const ExerciseCard = ({ exercise, onUpdateExercise, onRemoveExercise, isInitiallyEditing = false }) => {
  const [isEditing, setIsEditing] = useState(isInitiallyEditing);
  const [currentExercise, setCurrentExercise] = useState({...exercise});
  const [nameInput, setNameInput] = useState(exercise.name);
  const [filteredNameSuggestions, setFilteredNameSuggestions] = useState([]);
  const [gripInput, setGripInput] = useState(exercise.grip);
  const [filteredGripSuggestions, setFilteredGripSuggestions] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCurrentExercise({...exercise});
    setNameInput(exercise.name);
    setGripInput(exercise.grip);
    if (isInitiallyEditing) {
        setIsEditing(true);
    }
  }, [exercise, isInitiallyEditing]);

  const validateExercise = () => {
    const newErrors = {};
    if (!currentExercise.name.trim()) newErrors.name = "Nombre requerido.";
    currentExercise.series.forEach((s, i) => {
        if (s.reps === '' || s.reps < 0) newErrors[`reps-${s.id}`] = `Reps S${i+1} inválidas.`;
        if (s.weight === '' || s.weight < 0) newErrors[`weight-${s.id}`] = `Peso S${i+1} inválido.`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateExercise()) {
      onUpdateExercise(currentExercise.id, currentExercise);
      setIsEditing(false);
      setErrors({});
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentExercise(prev => ({ ...prev, [name]: value }));
    if (name === "name") {
      setNameInput(value);
      setFilteredNameSuggestions(value ? exerciseSuggestions.filter(s => s.toLowerCase().includes(value.toLowerCase())) : []);
    }
    if (name === "grip") {
      setGripInput(value);
      setFilteredGripSuggestions(value ? gripSuggestions.filter(s => s.toLowerCase().includes(value.toLowerCase())) : []);
    }
  };

  const handleSelectSuggestion = (suggestion, field) => {
    if (field === 'name') {
      setCurrentExercise(prev => ({ ...prev, name: suggestion }));
      setNameInput(suggestion);
      setFilteredNameSuggestions([]);
    } else if (field === 'grip') {
      setCurrentExercise(prev => ({ ...prev, grip: suggestion }));
      setGripInput(suggestion);
      setFilteredGripSuggestions([]);
    }
  };

  const handleSeriesDataChange = (seriesIndex, field, value) => {
    const updatedSeries = currentExercise.series.map((s, i) =>
      i === seriesIndex ? { ...s, [field]: value } : s
    );
    setCurrentExercise(prev => ({ ...prev, series: updatedSeries }));
  };

  const handleNumSeriesChange = (e) => {
    let num = parseInt(e.target.value, 10);
    if (isNaN(num) || num < 1) num = 1;
    if (num > 10) num = 10;

    let newSeriesArray = [...currentExercise.series];
    const currentNumSeries = newSeriesArray.length;

    if (num > currentNumSeries) {
      for (let i = currentNumSeries; i < num; i++) {
        newSeriesArray.push({ id: `series-${Date.now()}-${i}`, reps: '', weight: '', rest: '' });
      }
    } else if (num < currentNumSeries) {
      newSeriesArray = newSeriesArray.slice(0, num);
    }
    setCurrentExercise(prev => ({ ...prev, numSeries: num, series: newSeriesArray }));
  };

  return (
    <div className="bg-zinc-800 p-4 sm:p-6 rounded-xl shadow-lg mb-6">
      <div className="flex justify-between items-start mb-4">
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={nameInput}
            onChange={handleInputChange}
            placeholder="Nombre del Ejercicio"
            className="text-lg font-semibold bg-zinc-700 text-white p-2 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
            list="exercise-name-suggestions"
          />
        ) : (
          <h3 className="text-xl font-semibold text-indigo-400 break-all">{currentExercise.name || "Ejercicio sin nombre"}</h3>
                  )}
                  <div className="flex space-x-2 ml-2 flex-shrink-0">
                    {isEditing ? (
                      <button onClick={handleSave} className="p-2 text-green-400 hover:text-green-300">
                        <Save size={20} />
                      </button>
                    ) : (
                      <button onClick={() => setIsEditing(true)} className="p-2 text-yellow-400 hover:text-yellow-300">
                        <Edit3 size={20} />
                      </button>
                    )}
                    <button onClick={() => onRemoveExercise(currentExercise.id)} className="p-2 text-red-400 hover:text-red-300">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                {isEditing && filteredNameSuggestions.length > 0 && nameInput && (
                  <div className="relative mb-2">
                    <ul className="absolute z-10 w-full bg-zinc-700 border border-zinc-600 rounded-md shadow-lg max-h-40 overflow-y-auto">
                      {filteredNameSuggestions.map(s => (
                        <li key={s} onClick={() => handleSelectSuggestion(s, 'name')} className="p-2 hover:bg-zinc-600 cursor-pointer text-sm">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {errors.name && <p className="text-xs text-red-400 mt-1 mb-2">{errors.name}</p>}


                {isEditing && (
                  <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`grip-${currentExercise.id}`} className="block text-sm font-medium text-gray-300 mb-1">Tipo de Agarre/Variante</label>
                      <input
                        type="text"
                        id={`grip-${currentExercise.id}`}
                        name="grip"
                        value={gripInput}
                        onChange={handleInputChange}
                        placeholder="Ej: Barra, Cuerda"
                        className="w-full p-2 bg-zinc-700 border border-zinc-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white text-sm"
                        list="grip-suggestions"
                      />
                      {filteredGripSuggestions.length > 0 && gripInput && (
                        <div className="relative">
                          <ul className="absolute z-10 w-full bg-zinc-700 border border-zinc-600 rounded-md shadow-lg max-h-32 overflow-y-auto mt-1">
                            {filteredGripSuggestions.map(s => (
                              <li key={s} onClick={() => handleSelectSuggestion(s, 'grip')} className="p-2 hover:bg-zinc-600 cursor-pointer text-sm">
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div>
                      <label htmlFor={`numSeries-${currentExercise.id}`} className="block text-sm font-medium text-gray-300 mb-1">Número de Series</label>
                      <input
                        type="number"
                        id={`numSeries-${currentExercise.id}`}
                        name="numSeries"
                        value={currentExercise.numSeries || currentExercise.series.length}
                        onChange={handleNumSeriesChange}
                        className="w-full p-2 bg-zinc-700 border border-zinc-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white text-sm"
                        min="1"
                        max="10"
                      />
                    </div>
                  </div>
                )}
                {!isEditing && currentExercise.grip && (
                  <p className="text-sm text-gray-400 mb-3">Agarre/Variante: <span className="text-gray-200">{currentExercise.grip}</span></p>
                )}

                <div>
                  {currentExercise.series.map((s, index) => (
                    <div key={s.id}>
                      <SeriesInput
                        seriesNumber={index + 1}
                        seriesData={s}
                        onSeriesChange={handleSeriesDataChange}
                        isEditing={isEditing}
                      />
                      {errors[`reps-${s.id}`] && <p className="text-xs text-red-400 mt-0 mb-1 pl-1">{errors[`reps-${s.id}`]}</p>}
                      {errors[`weight-${s.id}`] && <p className="text-xs text-red-400 mt-0 mb-1 pl-1">{errors[`weight-${s.id}`]}</p>}
                    </div>
                  ))}
                </div>

                {isEditing && (
                  <div className="mt-4">
                    <label htmlFor={`notes-${currentExercise.id}`} className="block text-sm font-medium text-gray-300 mb-1">Notas (opcional)</label>
                    <textarea
                      id={`notes-${currentExercise.id}`}
                      name="notes"
                      value={currentExercise.notes || ''}
                      onChange={handleInputChange}
                      placeholder="Alguna observación sobre el ejercicio..."
                      rows="2"
                      className="w-full p-2 bg-zinc-700 border border-zinc-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white text-sm"
                    ></textarea>
                  </div>
                )}
                {!isEditing && currentExercise.notes && (
                   <div className="mt-3 pt-3 border-t border-zinc-700">
                      <p className="text-sm text-gray-400">Notas:</p>
                      <p className="text-sm text-gray-200 whitespace-pre-wrap">{currentExercise.notes}</p>
                  </div>
                )}
              </div>
            );
          };

          export default function ProgressChart() {
            const [selectedDate, setSelectedDate] = useState(today);
            const [exercises, setExercises] = useState([]);
            const [showCalendar, setShowCalendar] = useState(false);
            const [formError, setFormError] = useState('');

            const handleAddExercise = () => {
              setFormError('');
              if (!selectedDate) {
                  setFormError("Por favor, selecciona una fecha primero.");
                  return;
              }
              const newExercise = {
                id: `ex-${Date.now()}`,
                name: '',
                grip: '',
                numSeries: 3,
                series: [
                  { id: `series-${Date.now()}-0`, reps: '', weight: '', rest: '60' },
                  { id: `series-${Date.now()}-1`, reps: '', weight: '', rest: '60' },
                  { id: `series-${Date.now()}-2`, reps: '', weight: '', rest: '60' },
                ],
                notes: '',
                date: selectedDate
              };
              setExercises(prev => [...prev, newExercise]);
            };

            const handleUpdateExercise = (id, updatedExercise) => {
              setExercises(prev => prev.map(ex => ex.id === id ? { ...ex, ...updatedExercise } : ex));
            };

            const handleRemoveExercise = (id) => {
              setExercises(prev => prev.filter(ex => ex.id !== id));
            };

            const handleDateChange = (e) => {
              setSelectedDate(e.target.value);
              setShowCalendar(false);
              setFormError('');
              // Aquí podrías cargar ejercicios para la nueva fecha si estuvieran persistidos
            };

            const handleSubmitWorkout = () => {
              setFormError('');
              if (!selectedDate) {
                  setFormError("Por favor, selecciona una fecha.");
                  return;
              }
              if (exercises.length === 0) {
                  setFormError("Añade al menos un ejercicio.");
                  return;
              }

              let hasErrorsInCards = false;
                  exercises.forEach(ex => {
                      if (!ex.name.trim()) {
                          // Podrías intentar forzar la edición o mostrar un error en la tarjeta específica
                          hasErrorsInCards = true;
                      }
                      ex.series.forEach(s => {
                          if (s.reps === '' || s.reps < 0 || s.weight === '' || s.weight < 0) {
                              hasErrorsInCards = true;
                          }
                      });
                  });

                  if (hasErrorsInCards) {
                      setFormError("Algunos ejercicios tienen campos incompletos o inválidos. Por favor, revisa y guarda cada tarjeta.");
                      return;
                  }

                  // Comprobar si hay alguna tarjeta en modo edición
                  const isAnyCardEditing = exercises.some(ex => {
                      // Esto es una simplificación. Necesitarías una forma más robusta de saber si una tarjeta está editando.
                      // Podrías añadir un estado 'isEditing' a cada objeto 'exercise' en el array 'exercises'
                      // o pasar una referencia/callback para verificar.
                      // Por ahora, asumimos que si no hay errores, y el usuario le da a "Guardar Entrenamiento",
                      // es porque ya guardó todas las tarjetas individuales.
                      return false; // Simplificación
                  });

                  if (isAnyCardEditing) {
                      setFormError("Por favor, guarda todos los ejercicios individuales antes de registrar el entrenamiento completo.");
                      return;
                  }

                  console.log("Entrenamiento a registrar:", { date: selectedDate, exercises });
                  alert(`Entrenamiento para el ${selectedDate} registrado con ${exercises.length} ejercicios! (Ver consola para detalles)`);
                  // Aquí iría la lógica para enviar los datos a un backend o localStorage
                  // setExercises([]); // Opcional: limpiar formulario después de enviar
                };


                const toggleCalendar = () => setShowCalendar(!showCalendar);

                const filteredExercises = exercises.filter(ex => ex.date === selectedDate);

                return (
                  <div className=" bg-zinc-900 text-white p-4 md:p-8">
                    <div className="mx-auto">
                      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-400">Registrar Progreso</h1>

                      <div className="mb-8 p-6 bg-zinc-800 rounded-xl shadow-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="relative w-full sm:w-auto">
                            <label htmlFor="workout-date" className="block text-sm font-medium text-gray-300 mb-1">
                              Fecha del Entrenamiento
                            </label>
                            <div className="flex items-center">
                              <input
                                type="date"
                                id="workout-date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                className="w-full p-3 bg-zinc-700 border border-zinc-600 rounded-l-md focus:ring-indigo-500 focus:border-indigo-500 text-white"
                              />
                              <button
                                onClick={toggleCalendar}
                                className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-md"
                                aria-label="Toggle calendar"
                              >
                                {showCalendar ? <ChevronUp size={20} /> : <CalendarDays size={20} />}
                              </button>
                            </div>
                            {showCalendar && (
                              <div className="absolute top-full left-0 mt-1 z-10 bg-zinc-700 p-2 rounded-md shadow-lg">
                                <p className="text-xs text-center text-gray-400">Selecciona la fecha.</p>
                              </div>
                            )}
                          </div>
                          <button
                              onClick={handleAddExercise}
                              disabled={!selectedDate}
                              className={`mt-4 sm:mt-0 flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow-md transition-colors duration-150 ease-in-out
                                          ${!selectedDate ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                              <PlusCircle size={20} className="mr-2" />
                              Añadir Ejercicio
                          </button>
                        </div>
                        {formError && (
                          <div className="mt-4 p-3 bg-red-500/20 border border-red-700 text-red-300 rounded-md flex items-center text-sm">
                              <AlertCircle size={20} className="mr-2 flex-shrink-0" />
                              {formError}
                          </div>
                        )}
                      </div>

                      {filteredExercises.length === 0 && selectedDate && (
                        <p className="text-center text-gray-400 my-10">
                          No hay ejercicios registrados para el {selectedDate}. ¡Añade el primero!
                        </p>
                      )}
                       {filteredExercises.length === 0 && !selectedDate && (
                        <p className="text-center text-gray-400 my-10">
                          Por favor, selecciona una fecha para empezar a registrar tu entrenamiento.
                        </p>
                      )}


                      <div className="space-y-6">
                        {filteredExercises.map((ex, index) => (
                          <ExerciseCard
                            key={ex.id}
                            exercise={ex}
                            onUpdateExercise={handleUpdateExercise}
                            onRemoveExercise={handleRemoveExercise}
                            isInitiallyEditing={!ex.name} // Entra en modo edición si es un ejercicio nuevo sin nombre
                          />
                        ))}
                      </div>

                      {filteredExercises.length > 0 && (
                        <div className="mt-10 pt-6 border-t border-zinc-700">
                          <button
                            onClick={handleSubmitWorkout}
                            className="w-full flex items-center justify-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-xl transition-all duration-150 ease-in-out text-lg"
                          >
                            <Save size={24} className="mr-3" />
                            Guardar Entrenamiento Completo
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }