import express, { Request, Response } from 'express';
import MySqlOperate from '../mysql/mysqlOperate';
const router = express.Router();

router.post('/signup', (req: Request, res: Response) => {
    let result = { isOk: true, error: {}, message: '' };
    const mysql = new MySqlOperate();
    isUserExist(req, mysql).then(data => { // 判断用户是否重复
        return new Promise((resolve, reject) => {
            result = data;
            if (!result.isOk) {
                mysql.endmysql();
                res.status(400).send(result);
                reject(result);
            } else {
                if (result.isOk) {
                    resolve(result);
                } else {
                    mysql.endmysql();
                    reject(result);
                }
            }
        })
    }).then(data => {
        createUser(req, mysql).then(data => { // 创建用户
            mysql.endmysql();
            result = data;
            let httpCode = 400;
            if (result.isOk) {
                httpCode = 200;
            }
            res.status(httpCode).send(result);
        }, error => {
            result = error;
            mysql.endmysql();
            res.status(400).send(result);
        });
    });
});

/**
 * 检查用户是否已经存在
 * @param req 
 * @param res 
 * @param mysql 
 */
const isUserExist = async (req: Request, mysql: MySqlOperate) => {
    const result = {
        isOk: true,
        error: {},
        message: ''
    }
    const sql = `select id from user where username = ?`;
    const paramList: Array<string> = [req.body.username];
    await mysql.querySql(sql, paramList).then((data: any) => {
        if (data.length) {
            result.isOk = false;
            result.message = 'The user has regisited.';
        }
    }, (error: any) => {
        console.log(`Query user error.${error}`);
        result.isOk = false;
        result.error = error;
        result.message = 'Query user error.';
    });
    return result;
}


/**
 * 创建用户
 * @param req 请求
 * @param res 响应
 * @param mysql 数据库操作对象
 */
const createUser = async (req: Request, mysql: MySqlOperate) => {
    const result = {
        isOk: true,
        error: {},
        message: ''
    }
    const sql = `insert into user values(null,?,?)`;
    const paramList = [req.body.username, req.body.password];
    await mysql.querySql(sql, paramList).then((data: any) => {
        if (!data.affectedRows) {
            result.isOk = false;
            result.message = 'Create user in db failed.';
        }
    }, (error) => {
        result.isOk = false;
        result.error = error;
        result.message = 'Create user in db failed.';
    });
    return result;
}

export default router;