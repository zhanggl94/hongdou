import jwt from 'jsonwebtoken';
import tokenConfig from '../config/token';
import {setRedis, getRedis} from '../db/redisOperate';

/**
 * 创建token
 * @param payload 
 * @returns 
 */
export const createToken = (payload: any) => {
    console.log('payload', payload);
    payload.iat = Date.now();
    payload.exp = Math.floor(Date.now() / 1000) + tokenConfig.accessExpTime;
    return jwt.sign(payload, tokenConfig.secret);
}

/**
 * 验证token
 * @param token 
 * @returns 
 */
export const verifyToken = (token: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, tokenConfig.secret, (err, data) => {
            console.log('JWT token: ', data);
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

