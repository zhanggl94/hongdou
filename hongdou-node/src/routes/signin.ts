import express, { Request } from 'express';
import MySqlOperate from '../mysql/mysqlOperate';

const router = express.Router();

router.post('/signin', (req, res) => {
    const mysql = new MySqlOperate();
    isUserExist(req, mysql).then(result => {
        if (result.isOk) {
            res.send(result);
        } else {
            res.status(400).send(result);
        }
        mysql.endmysql();
    });
})

const isUserExist = async (req: Request, mysql: MySqlOperate) => {
    const result = {
        isOk: true,
        error: {},
        message: ''
    }
    const sql = `select id from user where username = ? and password = ?`;
    const paramList = [req.body.username, req.body.password];
    await mysql.querySql(sql, paramList).then(
        (data: any) => {
            if (data.length) {
                result.isOk = true;
            } else {
                result.isOk = false;
                result.message = 'Username or password is not corrected.';
            }
        }, (error: any) => {
            result.isOk = false;
            result.error = error;
            result.message = 'There has some errors when query user.';
        });
    return result;
}

export default router;