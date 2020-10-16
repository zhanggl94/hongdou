import express, { Request, Response } from 'express';
import MySqlOperate from '../mysql/mysqlOperate';
const router = express.Router();

router.post('/signup', (req: Request, res: Response) => {
    let result = { isOk: true, error: {}, message: '' };
    const mysql = new MySqlOperate();
    result = isUserExist(req, mysql);
    console.log(result);
    if (!result.isOk) {
        res.status(400).send(result);
    } else {
        let httpCode = 400;
        result = createUser(req, mysql);
        if (result.isOk) {
            httpCode = 200;
        }
        res.status(httpCode).send(result);
    }
    mysql.endmysql();
});

/**
 * 检查用户是否已经存在
 * @param req 
 * @param res 
 * @param mysql 
 */
const isUserExist = (req: Request, mysql: MySqlOperate): any => {
    const result = {
        isOk: true,
        error: {},
        message: ''
    }
    const sql = `select id from user where username = "?" `;
    const paramList = [req.body.username];
    mysql.querySql(sql, paramList, (error: any, data: any) => {
        if (error) {
            console.log(`Query user error.${error}`);
            result.isOk = false;
            result.error = error;
            result.message = 'There has some system errors.';
        } else {
            if (data.affectedRows) {
                result.isOk = false;
                result.message = 'The user has regisited.';
            }
        }
        return result;
    });
}


/**
 * 创建用户
 * @param req 请求
 * @param res 响应
 * @param mysql 数据库操作对象
 */
const createUser = (req: Request, mysql: MySqlOperate): any => {
    const result = {
        isOk: true,
        error: {},
        message: ''
    }
    const sql = `insert into user values(null,?,?)`;
    const paramList = [req.body.username, req.body.password];
    mysql.querySql(sql, paramList, (error: any, data: any) => {
        if (error) {
            result.isOk = false;
            result.error = error;
            result.message = 'There has some system errors.';
        } else {
            if (!data.affectedRows) {
                result.isOk = false;
                result.message = 'Create user in db failed.';
            }
        }
        return result;
    });
}

export default router;