import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const CharacterDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [character, setCharacter] = useState({
      name: '',
      status: '',
      species: '',
      type: '',
      gender: '',
      image: '',
      isFromApi: false,
    });
    const [isEditable, setIsEditable] = useState(false);
  
    useEffect(() => {
      const fetchCharacter = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/characters/${id}`);
          setCharacter(response.data);
          setIsEditable(!response.data.isFromApi);
        } catch (error) {
          console.error("Error fetching character:", error);
        }
      };
  
      fetchCharacter();
    }, [id]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCharacter({
        ...character,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleUpdate = async () => {
      try {
        await axios.put(`http://localhost:5000/api/characters/update/${id}`, character);
        Swal.fire('Actualizado', 'El personaje ha sido actualizado.', 'success');
        navigate('/home');
      } catch (error) {
        Swal.fire('Error', 'No se pudo actualizar el personaje.', 'error');
      }
    };

    const imageUrl = character.isFromApi
    ? character.image
    : `/src/assets/img/characters/user.png`;
  
    const confirmUpdate = () => {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¡Esta acción actualizará los datos del personaje!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, actualizar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          handleUpdate();
        }
      });
    };
  
    if (!character) return <div>Loading...</div>;
  
    return (
        <motion.div
          className="container mx-auto p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          
          
          <img src={imageUrl} alt={character.name} className="w-full h-64 object-cover rounded-lg mb-4"/>

          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Name:</label>
              <input
                type="text"
                name="name"
                value={character.name}
                onChange={handleChange}
                disabled={!isEditable}
                className="border rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Status:</label>
              <input
                type="text"
                name="status"
                value={character.status}
                onChange={handleChange}
                disabled={!isEditable}
                className="border rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Species:</label>
              <input
                type="text"
                name="species"
                value={character.species}
                onChange={handleChange}
                disabled={!isEditable}
                className="border rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Type:</label>
              <input
                type="text"
                name="type"
                value={character.type}
                onChange={handleChange}
                disabled={!isEditable}
                className="border rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Gender:</label>
              <input
                type="text"
                name="gender"
                value={character.gender}
                onChange={handleChange}
                disabled={!isEditable}
                className="border rounded-lg p-2 w-full"
              />
            </div>
            {isEditable && (
              <button 
                onClick={confirmUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Actualizar
              </button>
            )}
            {!isEditable && (
              <button 
                onClick={() => navigate('/home')}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Volver Atrás
              </button>
            )}
          </div>
        </motion.div>
      );
  };
  
  export default CharacterDetail;