
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Asegúrate de importar la función para registrar usuario desde tu archivo de API
// import { registerUser } from '../utils/api';

const SignUp = () => {
  // Estados para los campos del formulario
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controlar el estado de carga del botón

  const navigate = useNavigate(); // Hook para la navegación

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    // Validaciones básicas en el frontend
    if (!username || !email || !password || !confirmPassword) {
      toast.error('Todos los campos son obligatorios');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    setLoading(true); // Inicia el estado de carga

    try {
      // Llama a tu función del backend para registrar al usuario
      // Asegúrate de que registerUser existe y maneja la llamada HTTP
      // const response = await registerUser({ username, email, password });

      // **Simulación de respuesta exitosa (elimina esto cuando tengas la API lista):**
      // Esta parte simula una respuesta exitosa de tu backend.
      // Cuando integres con tu API, reemplaza esto con la llamada real.
      console.log('Simulando registro con:', { username, email, password }); // Para depuración
      // Simula un retraso de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = { success: true, message: 'Usuario registrado con éxito. Por favor, verifica tu correo.' };
      // **Fin de la simulación**


      if (response?.success) { // Asumiendo que tu API responde con { success: true } en caso de éxito
        toast.success(response.message || 'Registro exitoso');
        // Redirige al usuario a la página de login u otra página relevante
        navigate('/verify-email');
      } else {
        // Si la respuesta no indica éxito pero no lanza una excepción
        throw new Error(response?.message || 'Respuesta inesperada del servidor');
      }
    } catch (error) {
      // Manejo de errores durante la llamada a la API
      // Asumiendo que el error de la API viene en error.response.data.message
      const errorMessage = error.response?.data?.message || 'Error al registrar usuario';
      toast.error(errorMessage);
      console.error('Error en el registro:', error);
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-900">
      {/* El contenedor del formulario ya es responsivo gracias a w-full y max-w-md */}
      <div className="w-full max-w-md bg-gray-800 p-10 rounded-lg shadow-lg">
        <div className="text-center">
          {/* El tamaño de texto es responsivo por defecto con text-2xl */}
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
            Crea tu cuenta
          </h2>
        </div>

        {/* El espaciado entre campos es responsivo con space-y-6 */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Campo Nombre de Usuario */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white">
              Nombre de Usuario
            </label>
            <div className="mt-2">
              {/* Los inputs son responsivos con block w-full */}
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="block w-full rounded-md bg-gray-100 px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Campo Correo Electrónico */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Correo Electrónico
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="block w-full rounded-md bg-gray-100 px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Campo Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Contraseña
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password" // Sugerencia para el navegador
                className="block w-full rounded-md bg-gray-100 px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Campo Confirmar Contraseña */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
              Confirmar Contraseña
            </label>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password" // Sugerencia para el navegador
                className="block w-full rounded-md bg-gray-100 px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Botón de Registro */}
          <div>
            <button
              type="submit"
              disabled={loading} // Deshabilita el botón durante la carga
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500"
            >
              {loading ? 'Registrando...' : 'Registrarse'} {/* Cambia el texto según el estado de carga */}
            </button>
          </div>
        </form>

        {/* Enlace a la página de Login */}
        <p className="mt-6 text-center text-sm text-gray-400">
          ¿Ya tienes una cuenta?{' '}
          <a href="/" className="font-semibold text-indigo-400 hover:text-indigo-300">
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;