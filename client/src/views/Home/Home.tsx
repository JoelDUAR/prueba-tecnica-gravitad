import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { Character } from "../../interfaces/Character";

const Home: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/characters');
        setCharacters(response.data.characters);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, [characters.length]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/characters/delete/${id}`);
      setCharacters(characters.filter(character => character._id !== id));
    } catch (error) {
      console.error('Error deleting character:', error);
    }
  };

  const confirmDelete = (id: number) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
        Swal.fire(
          '¡Eliminado!',
          'El personaje ha sido eliminado.',
          'success'
        );
      }
    });
  };

  const getImageSrc = (character: Character) => {
    if (!character.isFromApi) {
      return `/src/assets/img/characters/user.png`;
    }
    return character.image;
  };

  return (
    <div className="container mx-auto p-4">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {Array.isArray(characters) && characters.map(character => (
          <div key={character._id} className="border rounded-lg shadow-lg p-4 bg-white">
            <img 
              src={getImageSrc(character)} 
              alt={character.name} 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{character.name}</h3>
            <p className="text-gray-700 mb-4">{character.status}</p>
            <button 
              onClick={() => navigate(`/character/${character._id}`)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Ver más
            </button>
            {!character.isFromApi && (
              <div className="mt-4">
                <button 
                  onClick={() => navigate(`/character/edit/${character._id}`)}
                  className="text-yellow-500 hover:text-yellow-600 mr-2"
                  title="Editar"
                >
                  ✏️
                </button>
                <button 
                  onClick={() => confirmDelete(character._id)}
                  className="text-red-500 hover:text-red-600"
                  title="Eliminar"
                >
                  🗑️
                </button>
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
