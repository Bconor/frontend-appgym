
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
// Importa iconos. Necesitarás instalar 'lucide-react' o una librería similar.
// npm install lucide-react
// o
// yarn add lucide-react
import { Menu, X } from 'lucide-react';

const LayoutWithSidebar = ({ children }) => {
  // Estado para controlar si el sidebar está abierto/cerrado en pantallas pequeñas
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Estado para saber si estamos en una pantalla grande (>= md breakpoint)
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Efecto para detectar el tamaño de la pantalla y actualizar los estados
  useEffect(() => {
    const checkScreenSize = () => {
      // Tailwind por defecto tiene un breakpoint 'md' en 768px.
      const large = window.innerWidth >= 768;
      setIsLargeScreen(large);
      // En pantallas grandes, el sidebar siempre debe estar visible
      // En pantallas pequeñas, lo cerramos por defecto al cambiar el tamaño
      if (large) {
        setIsSidebarOpen(true); // Siempre abierto en desktop
      } else {
        setIsSidebarOpen(false); // Cerrado por defecto en mobile
      }
    };

    // Ejecutar la comprobación al montar el componente
    checkScreenSize();
    // Añadir event listener para re-comprobar al redimensionar la ventana
    window.addEventListener('resize', checkScreenSize);

    // Limpieza: remover el event listener al desmontar el componente
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []); // El array vacío asegura que este efecto solo se ejecute al montar y desmontar

  return (
    // Contenedor principal: flex, altura completa
    <div className="flex h-screen">

      {/* Botón de hamburguesa para pantallas pequeñas */}
      {/* Solo se muestra en md:hidden (pantallas pequeñas) y si no es una pantalla grande */}
      {!isLargeScreen && (
        <div className="fixed top-4 left-4 z-50 md:hidden"> {/* z-50 asegura que esté encima de todo */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Alterna el estado abierto/cerrado
            className="p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
          >
            {/* Cambia el icono según si el sidebar está abierto */}
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      )}

      {/* Sidebar */}
      {/* Usamos clases condicionales para controlar su visibilidad y posición */}
      <div
        className={`
          ${isLargeScreen ? 'relative translate-x-0' : 'fixed inset-y-0 left-0'} /* Posicionamiento: relative en desktop, fixed en mobile */
          transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} /* Transformación para deslizar (visible vs oculto) */
          transition-transform duration-300 ease-in-out /* Animación de deslizamiento */
          z-40 /* Z-index: asegura que esté encima del contenido pero debajo del botón */
          w-64 /* Ancho fijo del Sidebar */
          bg-gray-800 /* Fondo del Sidebar */
          text-white /* Color de texto del Sidebar */
          flex-shrink-0 /* Evita encogerse */
          ${isLargeScreen ? '' : 'shadow-lg'} /* Sombra en mobile cuando se abre */
        `}
        // Nota: Asegúrate de que Sidebar.jsx tenga h-full en su contenido principal si quieres que ocupe toda la altura visualmente.
      >
         {/* Contenedor interno del Sidebar con padding y margen superior para mobile (para no chocar con el botón) */}
        <div className="p-4 mt-16 md:mt-0 overflow-y-auto h-full"> {/* mt-16 empuja el contenido hacia abajo en mobile */}
           <Sidebar /> {/* Renderiza tu componente Sidebar */}
        </div>
      </div>

      {/* Área del Contenido Principal */}
      {/* Usamos clases condicionales para añadir un margen izquierdo en pantallas grandes */}
      <div className={`flex-1 overflow-y-auto  text-white ${isLargeScreen ? 'ml-64' : ''}`}> {/* ml-64 para dejar espacio al sidebar en desktop */}

         {/* Contenedor interno para el padding y centrado del contenido de la página */}
         <div className="p-4 flex items-center justify-center min-h-full">
           {children} {/* Renderiza el contenido de la página */}
         </div>

      </div>

      {/* Overlay oscuro para pantallas pequeñas cuando el sidebar está abierto */}
      {isSidebarOpen && !isLargeScreen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30" // Cubre la pantalla con un fondo semi-transparente
          onClick={() => setIsSidebarOpen(false)} // Cierra el sidebar al hacer clic fuera
        ></div>
      )}

    </div>
  );
};

export default LayoutWithSidebar;