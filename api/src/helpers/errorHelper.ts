import { Response } from 'express';

export const errorHelper = async (res: Response, status: number, error: string) => {
    return res.status(status).json({ auth: false, message: error });
}

