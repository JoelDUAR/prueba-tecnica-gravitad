import { Request, Response } from 'express';
import { validationUser, signUp } from '../controllers/authController';
import { errorHelper } from '../helpers/errorHelper';
const { SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const userValidation = await validationUser(username, password);

    const newToken = jwt.sign(
      { id: userValidation._id, username: userValidation.username },
      SECRET_KEY,
      { expiresIn: '1m' }
  );

    const userResponse = {
      user: userValidation.username,
      auth: true,
      jwt: newToken
    }
    res.json(userResponse);
  } catch (error) {
    errorHelper(res, 404, (error as Error).message);
  }
};

export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const newUser = await signUp(username, password);
        res.status(201).json({ newUser })
    } catch (error) {
        errorHelper(res, 500, (error as Error).message);
    }
}
