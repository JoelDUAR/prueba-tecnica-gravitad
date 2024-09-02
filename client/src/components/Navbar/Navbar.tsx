import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../LogoutButton/LogoutButton';

const Navbar: React.FC = () => {
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <header className="bg-gray-800 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          {isAuthenticated && (
            <>
              <Link
                to="/home"
                className="bg-blue-100 text-gray-800 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-200"
              >
                Home
              </Link>
              <Link
                to="/CharacterForm"
                className="bg-blue-100 text-gray-800 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-200"
              >
                Agregar Personaje
              </Link>
            </>
          )}
        </div>
        {isAuthenticated && (
          <div>
            <LogoutButton />
          </div>
        )}
        {!isAuthenticated && (
          <div>
            <Link
              to="/"
              className="bg-blue-100 text-gray-800 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-200"
            >
              Login
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
