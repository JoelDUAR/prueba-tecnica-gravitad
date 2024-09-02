"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCharacterById = exports.getCharacters = exports.deleteCharacter = exports.updateCharacter = exports.createCharacter = exports.storeDataInDB = void 0;
const Character_1 = __importDefault(require("../models/Character"));
const axios_1 = __importDefault(require("axios"));
const storeDataInDB = async () => {
    const response = (await axios_1.default.get('https://rickandmortyapi.com/api/character')).data;
    const characters = response.results;
    if (!characters) {
        throw new Error('No se encontraron resultados de personajes');
    }
    for (const character of characters) {
        const filter = { _id: character.id };
        const characterFromApi = new Character_1.default({
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
        await Character_1.default.findOneAndUpdate(filter, characterFromApi, options);
    }
    const charactersDatabase = await Character_1.default.find();
    console.log('Successfully synchronized characters');
    return charactersDatabase;
};
exports.storeDataInDB = storeDataInDB;
const createCharacter = async (_id, name, status, species, type, gender, image, isFromApi) => {
    const character = new Character_1.default({ _id, name, status, species, type, gender, image, isFromApi });
    await character.save();
    return character;
};
exports.createCharacter = createCharacter;
const updateCharacter = async (id, name, status, species, type, gender, image, isFromApi) => {
    const updatedCharacter = await Character_1.default.findByIdAndUpdate(id, { name, status, species, type, gender, image, isFromApi }, { new: true });
    return updatedCharacter;
};
exports.updateCharacter = updateCharacter;
const deleteCharacter = async (id) => {
    const characterFounded = await (0, exports.getCharacterById)(id);
    if (!characterFounded)
        throw new Error('This ID does not correspond to any character');
    await Character_1.default.findByIdAndDelete(id);
    return characterFounded;
};
exports.deleteCharacter = deleteCharacter;
const getCharacters = async (pageNumber, limitNumber) => {
    let characters;
    let totalCharacters = await Character_1.default.countDocuments();
    let totalPages = 1;
    if (pageNumber && limitNumber) {
        characters = await Character_1.default.find()
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);
        totalPages = Math.ceil(totalCharacters / limitNumber);
        return { characters, totalPages };
    }
    else {
        characters = await Character_1.default.find();
        return { characters };
    }
};
exports.getCharacters = getCharacters;
const getCharacterById = async (id) => {
    const character = await Character_1.default.findById(id);
    if (!character)
        throw new Error('Character not found');
    return character;
};
exports.getCharacterById = getCharacterById;
