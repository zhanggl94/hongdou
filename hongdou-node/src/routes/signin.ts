import express, { Request } from 'express';
import MySqlOperate from '../mysql/mysqlOperate';
import { cryPassword } from '../utils/cryptoUtil';
import { formatDateHour24 } from '../utils/util';
import constants from '../utils/constants';

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
    const sql = `SELECT id, password, createtime FROM user WHERE username = ?`;
    const paramList = [req.body.username];
    await mysql.querySql(sql, paramList).then(
        (data: any) => {
            if (data.length) {
                const { id, password, createtime } = data[0];
                console.log(createtime);
                if (password === cryPassword(req.body.password, formatDateHour24(createtime, constants.time_zone_zh_cn))) {
                    result.isOk = true;
                    const updateSql = `UPDATE user SET lastlogintime = ? where id = ?`;
                    const updateParamList = [formatDateHour24(new Date(), constants.time_zone_zh_cn), id];
                    mysql.querySql(updateSql, updateParamList);
                } else {
                    result.isOk = false;
                    result.message = 'Username or password is not corrected.';
                }
            } else {
                result.isOk = false;
                result.message = 'User not exist.';
            }
        }, (error: any) => {
            result.isOk = false;
            result.error = error;
            result.message = 'There has some errors when query user.';
        });
    return result;
}

export default router;