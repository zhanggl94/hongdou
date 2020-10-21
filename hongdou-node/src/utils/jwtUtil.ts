import jwt from 'jsonwebtoken';
import tokenConfig from '../config/token';

export const createToken = (payload: any) => {
    payload.iat = Date.now();
    payload.exp = Math.floor(Date.now() / 1000) + tokenConfig.exp_time;
    return jwt.sign(payload, tokenConfig.secret);
}

export const verifyToken = (token: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, tokenConfig.secret, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}