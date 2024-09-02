import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">404 - Página No Encontrada</h1>
      <p className="text-lg mb-6">Lo sentimos, la página que buscas no existe.</p>
      <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Volver al Inicio
      </Link>
    </div>
  );
};

export default NotFound;
