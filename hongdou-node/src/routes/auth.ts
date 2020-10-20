import { Request, Response } from 'express';
import { verifyToken } from '../utils/jwtUtil';

const auth = async (req: Request, res: Response, next:Function) => {
    if (req.url !== '/api/signin' && req.url !== '/api/signup') {
        const token:string = req.headers.jwttoken as string;
        console.log('token',token)
        try {
            const result = await verifyToken(token);
            console.log(result);
            next();
        } catch (error) {
            console.log(error);
            res.status(400).send({ isOk: false, error, message: 'Token verify failed.' });
        }
    } else {
        next();
    }
}

export default auth;