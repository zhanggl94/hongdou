import { Request, Response } from 'express';
import { verifyToken } from '../utils/jwtUtil';

const auth = async (req: Request, res: Response, next: Function) => {
    if (req.url !== '/api/signin' && req.url !== '/api/signup') {
        const token: string = req.headers.jwttoken as string;
        try {
            const result = await verifyToken(token);
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                res.status(401).send({ isOk: false, error, message: 'Token has expired, please login agin.' });
            } else {
                res.status(401).send({ isOk: false, error, message: 'Token verify failed.' });
            }
        }
    } else {
        next();
    }
}

export default auth;