import express, { request, Request, Response } from 'express';
import { cryPassword } from '../utils/cryptoUtil';
import { formatDateHour24 } from '../utils/util';
import { createToken } from '../utils/jwtUtil';
import constants from '../utils/constants';
import MySqlOperate from '../mysql/mysqlOperate';
import ResponResult from '../module/ResponResult';
const router = express.Router();

router.post('/signup', async (req: Request, res: Response) => {
    let result: ResponResult = new ResponResult();
    try {
        const mysql = new MySqlOperate();
        await mysql.connectmysql();
        result = await isUserExist(req, mysql); // 判断用户是否重复
        if (!result.isOk) {
            mysql.endmysql();
            res.status(400).send(result);
        } else {
            if (result.isOk) {
                result = await createUser(req, mysql) // 创建用户
                let httpCode = 400;
                if (result.isOk) {
                    httpCode = 200;
                    result.jwtToken = createToken({ username: req.body.username, userId: result.data.userId });
                }
                res.status(httpCode).send(result);
            } else {
                mysql.endmysql();
            }
        }
    } catch (error) {
        res.status(400).send({ isOk: false, error, message: 'There has some system error.' });
    }
});

/**
 * 检查用户是否已经存在
 * @param req 
 * @param res 
 * @param mysql 
 */
const isUserExist = async (req: Request, mysql: MySqlOperate) => {
    const result = new ResponResult();
    const sql = `select id from user where username = ?`;
    const paramList: Array<string> = [req.body.username];
    try {
        const data: any = await mysql.querySql(sql, paramList)
        if (data.length) {
            result.isOk = false;
            result.message = 'The user has regisited.';
        }
    } catch (error) {
        console.log(`Query user error.${error}`);
        result.isOk = false;
        result.error = error;
        result.message = 'Query user error.';
    }
    return result;
}


/**
 * 创建用户
 * @param req 请求
 * @param res 响应
 * @param mysql 数据库操作对象
 */
const createUser = async (req: Request, mysql: MySqlOperate) => {
    const result = new ResponResult();
    const currentDateTime = formatDateHour24(new Date(), constants.time_zone_zh_cn);
    console.log('curr', currentDateTime);
    const sql = `INSERT INTO user VALUES (null,?,?,?,?)`;
    const cryPwd = cryPassword(req.body.password, currentDateTime);
    const paramList = [req.body.username, cryPwd, currentDateTime, currentDateTime];
    try {
        const data: any = await mysql.querySql(sql, paramList)
        console.log('data', data)
        if (!data.affectedRows) {
            result.isOk = false;
            result.message = 'Create user in db failed.';
        } else {
            result.data = { id: data.insertId };
        }
    } catch (error) {
        result.isOk = false;
        result.error = error;
        result.message = 'Create user in db failed.';
    }
    return result;
}
export default router;