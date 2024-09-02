import { Request, Response } from 'express';
import { errorHelper } from '../helpers/errorHelper';
import { createCharacter, updateCharacter, deleteCharacter, getCharacters, getCharacterById, storeDataInDB } from '../controllers/charactersController';

export const syncData = async (req: Request, res: Response) => {
  try {
      await storeDataInDB();
      res.status(200).json({ message: 'Datos sincronizados exitosamente' });
  } catch (error) {
    errorHelper(res, 500, (error as Error).message);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const {id, name, status, species, type, gender, image, isFromApi } = req.body;
    const newCharacter = await createCharacter(id, name, status, species, type, gender, image, isFromApi);
    res.status(201).json(newCharacter);
  } catch (error) {
    errorHelper(res, 404, (error as Error).message);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, status, species, type, gender, image, isFromApi } = req.body;
    const updatedCharacter = await updateCharacter(id, name, status, species, type, gender, image, isFromApi);
    res.status(200).json(updatedCharacter);
  } catch (error) {
    errorHelper(res, 404, (error as Error).message);
  }
};

export const deleteCharacterById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const characterDeleted = await deleteCharacter(id);
    res.status(200).json(characterDeleted);
  } catch (error) {
    errorHelper(res, 404, (error as Error).message);
  }
}

export const getAll = async (req: Request, res: Response) => {
  try {
      const { page, limit } = req.query;

      if (!page && !limit) {
          const { characters } = await getCharacters();
          return res.status(200).json({ characters });
      }

      const pageNumber = page ? parseInt(page as string, 10) : undefined;
      const limitNumber = limit ? parseInt(limit as string, 10) : undefined;

      const { characters, totalPages } = await getCharacters(pageNumber, limitNumber);

      if (characters.length === 0) {
          return errorHelper(res, 404, 'No se encontraron personajes');
      }

      res.status(200).json({
          characters,
          totalPages,
          currentPage: pageNumber || 1,
      });
  } catch (error) {
      errorHelper(res, 500, (error as Error).message);
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
      const { id } = req.params;      
      const character = await getCharacterById(id);
      res.status(200).json(character);
  } catch (error) {
      errorHelper(res, 500, (error as Error).message);
  }
};
