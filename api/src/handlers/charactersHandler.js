"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getById = exports.getAll = exports.deleteCharacterById = exports.update = exports.create = exports.syncData = void 0;
const errorHelper_1 = require("../helpers/errorHelper");
const charactersController_1 = require("../controllers/charactersController");
const syncData = async (req, res) => {
    try {
        await (0, charactersController_1.storeDataInDB)();
        res.status(200).json({ message: 'Datos sincronizados exitosamente' });
    }
    catch (error) {
        (0, errorHelper_1.errorHelper)(res, 500, error.message);
    }
};
exports.syncData = syncData;
const create = async (req, res) => {
    try {
        const { id, name, status, species, type, gender, image, isFromApi } = req.body;
        const newCharacter = await (0, charactersController_1.createCharacter)(id, name, status, species, type, gender, image, isFromApi);
        res.status(201).json(newCharacter);
    }
    catch (error) {
        (0, errorHelper_1.errorHelper)(res, 404, error.message);
    }
};
exports.create = create;
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status, species, type, gender, image, isFromApi } = req.body;
        const updatedCharacter = await (0, charactersController_1.updateCharacter)(id, name, status, species, type, gender, image, isFromApi);
        res.status(200).json(updatedCharacter);
    }
    catch (error) {
        (0, errorHelper_1.errorHelper)(res, 404, error.message);
    }
};
exports.update = update;
const deleteCharacterById = async (req, res) => {
    try {
        const { id } = req.params;
        const characterDeleted = await (0, charactersController_1.deleteCharacter)(id);
        res.status(200).json(characterDeleted);
    }
    catch (error) {
        (0, errorHelper_1.errorHelper)(res, 404, error.message);
    }
};
exports.deleteCharacterById = deleteCharacterById;
const getAll = async (req, res) => {
    try {
        const { page, limit } = req.query;
        if (!page && !limit) {
            const { characters } = await (0, charactersController_1.getCharacters)();
            return res.status(200).json({ characters });
        }
        const pageNumber = page ? parseInt(page, 10) : undefined;
        const limitNumber = limit ? parseInt(limit, 10) : undefined;
        const { characters, totalPages } = await (0, charactersController_1.getCharacters)(pageNumber, limitNumber);
        if (characters.length === 0) {
            return (0, errorHelper_1.errorHelper)(res, 404, 'No se encontraron personajes');
        }
        res.status(200).json({
            characters,
            totalPages,
            currentPage: pageNumber || 1,
        });
    }
    catch (error) {
        (0, errorHelper_1.errorHelper)(res, 500, error.message);
    }
};
exports.getAll = getAll;
const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const character = await (0, charactersController_1.getCharacterById)(id);
        res.status(200).json(character);
    }
    catch (error) {
        (0, errorHelper_1.errorHelper)(res, 500, error.message);
    }
};
exports.getById = getById;
