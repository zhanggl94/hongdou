import express, { Request, Response } from 'express';
import MySqlOperate from '../mysql/mysqlOperate';
import isEmpty from 'lodash/isEmpty';
import ResponseResult from '../module/ResponResult';

const router = express.Router();

/**
 * 创建汽车信息
 */
router.post('/createcar', async (req: Request, res: Response) => {
    const result = { isOk: true, error: {}, message: '' };
    console.log(req.body);
    const sql = `INSERT INTO car (name,brand,isDefault,note) VALUES (?,?,?,?)`;
    const paramList = [req.body.name, req.body.brand, req.body.default, req.body.note];
    const mysql = new MySqlOperate();
    try {
        await mysql.connectmysql();
        const data: any = await mysql.querySql(sql, paramList);
        let resCode = 200;
        if (!data.affectedRows) {
            result.isOk = false;
            result.message = 'Create car failed.';
            resCode = 400;
        }
        res.status(resCode).send(result);
    } catch (error) {
        result.isOk = false;
        result.error = error;
        result.message = 'There is some system errors.';
        res.status(400).send(result);
    }
    mysql.endmysql();
});

/**
 * 查询汽车信息
 */
router.post('/search', async (req: Request, res: Response) => {
    const result = new ResponseResult();
    const sql = `SELECT * FROM car WHERE 1=1 `;
    const paramList = new Array<string>();
    if (!isEmpty(req.body)) {

    }
    try {
        const mysql = new MySqlOperate();
        await mysql.connectmysql();
        const data: any = await mysql.querySql(sql, paramList);
        if (data.length) {
            result.data = data;
        }
        res.send(result);
    } catch (error) {
        result.isOk = false;
        result.message = 'There has some system error.';
        result.error = error;
        res.status(400).send(result);
    }

})
export default router;