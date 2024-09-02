import Character from '../models/Character';
import axios from 'axios';

export const storeDataInDB = async () => {
    const response = (await axios.get('https://rickandmortyapi.com/api/character')).data;

    const characters = response.results;
        
   if (!characters) {
        throw new Error('No se encontraron resultados de personajes');
    }

    for (const character of characters) {
        const filter = { _id: character.id };

        const characterFromApi = new Character({
            _id: character.id,
            name: character.name,
            status: character.status,
            species: character.species,
            type: character.type,
            gender: character.gender,
            image: character.image,
            isFromApi: true,
        });

        const options = { upsert: true, new: true, setDefaultsOnInsert: true };

        await Character.findOneAndUpdate(filter, characterFromApi, options);
    }

    const charactersDatabase = await Character.find();

    console.log('Successfully synchronized characters');
  
    return charactersDatabase;
};

export const createCharacter = async (_id: string, name: string, status: string, species: string, type: string, gender: string, image: string, isFromApi: boolean) => {
    const character = new Character({_id, name, status, species, type, gender, image, isFromApi});
    await character.save();
    return character;
};

export const updateCharacter = async (id: string, name: string, status: string, species: string, type: string, gender: string, image: string, isFromApi: boolean) => {
    const updatedCharacter = await Character.findByIdAndUpdate(id, { name, status, species, type, gender, image, isFromApi }, { new: true });
    return updatedCharacter;
};

export const deleteCharacter = async (id: string) => {
    const characterFounded = await getCharacterById(id);

    if(!characterFounded) throw new Error('This ID does not correspond to any character');

    await Character.findByIdAndDelete(id);

    return characterFounded;
}

export const getCharacters = async (pageNumber?: number, limitNumber?: number) => {
    let characters;
    let totalCharacters = await Character.countDocuments();
    let totalPages = 1;

    if (pageNumber && limitNumber) {
        characters = await Character.find()
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);
        totalPages = Math.ceil(totalCharacters / limitNumber);
        return { characters, totalPages };
    } else {
        characters = await Character.find();
        return { characters };
    }
};


export const getCharacterById = async (id: string) => {
    const character = await Character.findById(id);
    if (!character) throw new Error('Character not found');
    return character;
};

