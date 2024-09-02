import React from 'react';
import { motion } from 'framer-motion';

const LogoutButton: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
    >
      Cerrar sesión
    </motion.button>
  );
};

export default LogoutButton;