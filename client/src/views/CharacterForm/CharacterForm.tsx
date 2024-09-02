import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharacterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [species, setSpecies] = useState('');
  const [type, setType] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [characters, setCharacters] = useState([]); 

  useEffect(() => {
    showCharacters();
    setError('');
    setSuccess('');
  }, [characters.length]);

  const showCharacters = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/characters');
      setCharacters(response.data.characters);    
    } catch (err) {
      setError('Error fetching characters');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !status || !species || !type || !gender) {
      setError('Please fill all fields.');
      return;
    }

    try {
      const newId = characters.length + 1;

      const newCharacter = {
        id: newId,
        name,
        status,
        species,
        type,
        gender,
        image: `${name}.jpg`,
        isFromApi: false
      };
  
      await axios.post('http://localhost:5000/api/characters/create', newCharacter);
   
      setSuccess('Character added successfully!');
      setName('');
      setStatus('');
      setSpecies('');
      setType('');
      setGender('');

      window.location.href = '/home';
    } catch (err) {
      setError('Error submitting the form.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-100 p-4">
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Agregar Personaje</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-gray-700">Status</label>
              <input
                id="status"
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label htmlFor="species" className="block text-gray-700">Species</label>
              <input
                id="species"
                type="text"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-gray-700">Type</label>
              <input
                id="type"
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-gray-700">Gender</label>
              <input
                id="gender"
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">
              Add Character
            </button>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CharacterForm;
