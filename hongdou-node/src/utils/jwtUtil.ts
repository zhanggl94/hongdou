import jwt from 'jsonwebtoken';
import tokenSecret from '../config/tokenSecret';

export const createToken = (payload: any) => {
    payload.ctime = Date.now();
    return jwt.sign(payload, tokenSecret);
}

export const verifyToken = (token: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, tokenSecret, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}