import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Menu, X } from 'lucide-react';

const LayoutWithSidebar = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const large = window.innerWidth >= 768;
      setIsLargeScreen(large);
      if (large) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="flex h-screen overflow-x-hidden">
      {/* Botón hamburguesa solo en mobile */}
      {!isLargeScreen && (
        <div className="fixed top-4 left-4 z-50 md:hidden">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`
          ${isLargeScreen ? 'relative translate-x-0' : 'fixed inset-y-0 left-0'}
          transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          transition-transform duration-300 ease-in-out
          z-40 w-64 bg-gray-800 text-white flex-shrink-0
          ${isLargeScreen ? '' : 'shadow-lg'}
        `}
      >
        <div className="p-4 mt-16 md:mt-0 overflow-y-auto h-full">
          <Sidebar />
        </div>
      </div>

      {/* Contenido principal */}
      <div className={`flex-1 overflow-y-auto text-white ${isLargeScreen ? 'ml-64' : ''}`}>
        <div className="p-4 min-h-full">
          {children}
        </div>
      </div>

      {/* Overlay para mobile */}
      {isSidebarOpen && !isLargeScreen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default LayoutWithSidebar;