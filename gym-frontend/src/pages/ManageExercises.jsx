import React, { useState, useEffect  } from 'react';
import { Plus, Edit2, Trash2, X, Save, Layers, BarChart, Zap, MessageSquare} from 'lucide-react';


const initialExercises = [ // Algunos datos de ejemplo para empezar
  { id: 'ex1', name: 'Press de Banca', muscleGroup: 'Pecho', maxWeight: 100, seriesCount: 4, type: 'Fuerza', comments: 'Enfocarse en la técnica.' },
  { id: 'ex2', name: 'Sentadilla Libre', muscleGroup: 'Piernas', maxWeight: 120, seriesCount: 3, type: 'Fuerza', comments: '' },
  { id: 'ex3', name: 'Correr en Cinta', muscleGroup: 'Cardio', maxWeight: null, seriesCount: 1, type: 'Cardio', comments: '30 minutos a ritmo constante.' },
];

const muscleGroups = ["Pecho", "Espalda", "Piernas", "Hombros", "Bíceps", "Tríceps", "Abdomen", "Cardio", "Otro"];
const exerciseTypes = ["Fuerza", "Resistencia", "Cardio", "Flexibilidad", "Potencia", "Otro"];

const ExerciseFormModal = ({ isOpen, onClose, onSave, exerciseToEdit }) => {
  const [exercise, setExercise] = useState(
    exerciseToEdit || {
      id: null,
      name: '',
      muscleGroup: '',
      maxWeight: '',
      seriesCount: '',
      type: '',
      comments: ''
    }
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (exerciseToEdit) {
      setExercise(exerciseToEdit);
    } else {
      setExercise({ id: null, name: '', muscleGroup: '', maxWeight: '', seriesCount: '', type: '', comments: '' });
    }
    setErrors({}); // Resetear errores al abrir o cambiar ejercicio
  }, [isOpen, exerciseToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExercise(prev => ({ ...prev, [name]: value }));
    if (errors[name]) { // Limpiar error si el usuario empieza a corregir
        setErrors(prev => ({...prev, [name]: null}));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!exercise.name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!exercise.muscleGroup) newErrors.muscleGroup = "Selecciona un grupo muscular.";
    if (!exercise.type) newErrors.type = "Selecciona un tipo de ejercicio.";
    if (exercise.maxWeight !== '' && (isNaN(parseFloat(exercise.maxWeight)) || parseFloat(exercise.maxWeight) < 0)) {
      newErrors.maxWeight = "El peso máximo debe ser un número positivo.";
    }
    if (exercise.seriesCount !== '' && (isNaN(parseInt(exercise.seriesCount)) || parseInt(exercise.seriesCount) < 1)) {
      newErrors.seriesCount = "La cantidad de series debe ser al menos 1.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({ ...exercise, id: exercise.id || `ex-${Date.now()}` });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
      <div className="bg-zinc-800 p-6 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-indigo-400">
            {exerciseToEdit ? 'Editar Ejercicio' : 'Agregar Nuevo Ejercicio'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nombre del Ejercicio</label>
            <input
              type="text"
              name="name"
              id="name"
              value={exercise.name}
              onChange={handleChange}
              className={`w-full p-2 bg-zinc-700 border ${errors.name ? 'border-red-500' : 'border-zinc-600'} rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white`}
            />
            {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="muscleGroup" className="block text-sm font-medium text-gray-300 mb-1">Grupo Muscular</label>
              <select
                name="muscleGroup"
                id="muscleGroup"
                value={exercise.muscleGroup}
                onChange={handleChange}
                className={`w-full p-2 bg-zinc-700 border ${errors.muscleGroup ? 'border-red-500' : 'border-zinc-600'} rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white`}
              >
                <option value="">Seleccionar...</option>
                {muscleGroups.map(group => <option key={group} value={group}>{group}</option>)}
              </select>
              {errors.muscleGroup && <p className="text-xs text-red-400 mt-1">{errors.muscleGroup}</p>}
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">Tipo de Ejercicio</label>
              <select
                name="type"
                id="type"
                value={exercise.type}
                onChange={handleChange}
                className={`w-full p-2 bg-zinc-700 border ${errors.type ? 'border-red-500' : 'border-zinc-600'} rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white`}
              >
                <option value="">Seleccionar...</option>
                {exerciseTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
              {errors.type && <p className="text-xs text-red-400 mt-1">{errors.type}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="maxWeight" className="block text-sm font-medium text-gray-300 mb-1">Peso Máximo Actual (kg)</label>
              <input
                type="number"
                name="maxWeight"
                id="maxWeight"
                value={exercise.maxWeight}
                onChange={handleChange}
                placeholder="Ej: 100"
                className={`w-full p-2 bg-zinc-700 border ${errors.maxWeight ? 'border-red-500' : 'border-zinc-600'} rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white`}
                min="0"
              />
              {errors.maxWeight && <p className="text-xs text-red-400 mt-1">{errors.maxWeight}</p>}
            </div>
            <div>
              <label htmlFor="seriesCount" className="block text-sm font-medium text-gray-300 mb-1">Cantidad de Series Predeterminada</label>
              <input
                type="number"
                name="seriesCount"
                id="seriesCount"
                jsx
                                value={exercise.seriesCount}
                                onChange={handleChange}
                                placeholder="Ej: 3"
                                className={`w-full p-2 bg-zinc-700 border ${errors.seriesCount ? 'border-red-500' : 'border-zinc-600'} rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white`}
                                min="1"
                              />
                              {errors.seriesCount && <p className="text-xs text-red-400 mt-1">{errors.seriesCount}</p>}
                            </div>
                          </div>

                          <div>
                            <label htmlFor="comments" className="block text-sm font-medium text-gray-300 mb-1">Comentarios (Opcional)</label>
                            <textarea
                              name="comments"
                              id="comments"
                              value={exercise.comments}
                              onChange={handleChange}
                              rows="3"
                              className="w-full p-2 bg-zinc-700 border border-zinc-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white"
                              placeholder="Notas adicionales sobre el ejercicio..."
                            ></textarea>
                          </div>

                          <div className="flex justify-end pt-4">
                            <button
                              type="button"
                              onClick={onClose}
                              className="mr-3 px-4 py-2 text-gray-300 hover:text-white"
                            >
                              Cancelar
                            </button>
                            <button
                              type="submit"
                              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-md flex items-center"
                            >
                              <Save size={18} className="mr-2" /> Guardar Ejercicio
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  );
                };


                export default function ManageExercises() {
                  const [exercises, setExercises] = useState(initialExercises);
                  const [isModalOpen, setIsModalOpen] = useState(false);
                  const [exerciseToEdit, setExerciseToEdit] = useState(null);
                  const [searchTerm, setSearchTerm] = useState('');
                  const [filterMuscleGroup, setFilterMuscleGroup] = useState('');
                  const [filterType, setFilterType] = useState('');


                  const handleOpenModal = (exercise = null) => {
                    setExerciseToEdit(exercise);
                    setIsModalOpen(true);
                  };

                  const handleCloseModal = () => {
                    setIsModalOpen(false);
                    setExerciseToEdit(null); // Limpiar el ejercicio en edición al cerrar
                  };

                  const handleSaveExercise = (exerciseData) => {
                    if (exerciseToEdit) {
                      setExercises(prev => prev.map(ex => ex.id === exerciseData.id ? exerciseData : ex));
                    } else {
                      setExercises(prev => [...prev, exerciseData]);
                    }
                  };

                  const handleDeleteExercise = (exerciseId) => {
                    if (window.confirm("¿Estás seguro de que quieres eliminar este ejercicio?")) {
                        setExercises(prev => prev.filter(ex => ex.id !== exerciseId));
                    }
                  };

                  const filteredExercises = exercises.filter(ex => {
                    const nameMatch = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
                    const muscleGroupMatch = filterMuscleGroup ? ex.muscleGroup === filterMuscleGroup : true;
                    const typeMatch = filterType ? ex.type === filterType : true;
                    return nameMatch && muscleGroupMatch && typeMatch;
                  });

                  return (
                    <div className="w-full p-4 md:p-8">
                      <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                          <h1 className="text-3xl font-bold text-indigo-400">Mis Ejercicios Personalizados</h1>
                          <button
                            onClick={() => handleOpenModal()}
                            className="flex items-center px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-colors"
                          >
                            <Plus size={20} className="mr-2" /> Agregar Ejercicio
                          </button>
                        </div>

                        {/* Filtros */}
                        <div className="mb-6 p-4 bg-zinc-800 rounded-lg shadow">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <input
                                    type="text"
                                    placeholder="Buscar por nombre..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="p-2 bg-zinc-700 border border-zinc-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white"
                                />
                                <select
                                    value={filterMuscleGroup}
                                    onChange={(e) => setFilterMuscleGroup(e.target.value)}
                                    className="p-2 bg-zinc-700 border border-zinc-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white"
                                >
                                    <option value="">Todos los Grupos Musculares</option>
                                    {muscleGroups.map(group => <option key={group} value={group}>{group}</option>)}
                                </select>
                                <select
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                    className="p-2 bg-zinc-700 border border-zinc-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white"
                                >
                                    <option value="">Todos los Tipos</option>
                                    {exerciseTypes.map(type => <option key={type} value={type}>{type}</option>)}
                                </select>
                            </div>
                        </div>


                        {filteredExercises.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredExercises.map(exercise => (
                              <div key={exercise.id} className="bg-zinc-800 p-5 rounded-lg shadow-lg hover:shadow-indigo-500/30 transition-shadow duration-300 flex flex-col justify-between">
                                <div>
                                  <h3 className="text-xl font-semibold text-indigo-400 mb-2 truncate" title={exercise.name}>{exercise.name}</h3>
                                  <div className="space-y-1.5 text-sm mb-3">
                                    <p className="text-gray-300 flex items-center"><Layers size={15} className="mr-2 text-gray-400"/>Grupo: <span className="text-gray-200 ml-1">{exercise.muscleGroup}</span></p>
                                    <p className="text-gray-300 flex items-center"><Zap size={15} className="mr-2 text-gray-400"/>Tipo: <span className="text-gray-200 ml-1">{exercise.type}</span></p>
                                    {exercise.maxWeight && <p className="text-gray-300 flex items-center"><BarChart size={15} className="mr-2 text-gray-400"/>Max Peso: <span className="text-gray-200 ml-1">{exercise.maxWeight} kg</span></p>}
                                    {exercise.seriesCount && <p className="text-gray-300 flex items-center">Series: <span className="text-gray-200 ml-1">{exercise.seriesCount}</span></p>}
                                  </div>
                                  {exercise.comments && (
                                    <div className="mb-3 p-2 bg-zinc-700/50 rounded-md">
                                      <p className="text-xs text-gray-400 flex items-start"><MessageSquare size={14} className="mr-1.5 mt-0.5 flex-shrink-0"/> <span className="italic">{exercise.comments}</span></p>
                                    </div>
                                  )}
                                </div>
                                <div className="flex justify-end space-x-2 border-t border-zinc-700 pt-3 mt-3">
                                                  <button
                                                    onClick={() => handleOpenModal(exercise)}
                                                    className="p-2 text-yellow-400 hover:text-yellow-300"
                                                    title="Editar Ejercicio"
                                                  >
                                                    <Edit2 size={18} />
                                                  </button>
                                                  <button
                                                    onClick={() => handleDeleteExercise(exercise.id)}
                                                    className="p-2 text-red-400 hover:text-red-300"
                                                    title="Eliminar Ejercicio"
                                                  >
                                                    <Trash2 size={18} />
                                                  </button>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        ) : (
                                          <div className="text-center py-10">
                                            <Layers size={48} className="mx-auto text-gray-500 mb-4" />
                                            <h3 className="text-xl font-semibold text-gray-300 mb-2">No hay ejercicios personalizados</h3>
                                            <p className="text-gray-400">
                                                {searchTerm || filterMuscleGroup || filterType ? "No se encontraron ejercicios con los filtros actuales." : "Empieza agregando tu primer ejercicio."}
                                            </p>
                                          </div>
                                        )}

                                        <ExerciseFormModal
                                          isOpen={isModalOpen}
                                          onClose={handleCloseModal}
                                          onSave={handleSaveExercise}
                                          exerciseToEdit={exerciseToEdit}
                                        />
                                      </div>
                                    </div>
                                  );
                                }