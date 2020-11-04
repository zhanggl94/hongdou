import express, { Request, Response } from 'express';
import MySqlOperate from '../mysql/mysqlOperate';
import isEmpty from 'lodash/isEmpty';
import ResponseResult from '../module/ResponResult';

const router = express.Router();

/**
 * 创建汽车信息
 */
router.post('/createcar', async (req: Request, res: Response) => {
    const result = new ResponseResult();
    const sql = `INSERT INTO car (name,brand,isDefault,note, userId) VALUES (?,?,?,?,?)`;
    const paramList = [req.body.name, req.body.brand, req.body.isDefault, req.body.note, req.body.userId];
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
    const keyList: Array<string> = [],
        opertionList: Array<string> = [],
        valueList: Array<string> = [];
    if (!isEmpty(req.body)) {
        req.body.map((item: any) => {
            keyList.push(item.key);
            opertionList.push(item.operation);
            valueList.push(item.value);
        });
    }
    let sql = `SELECT * FROM car WHERE 1=1 `;
    if (keyList.length) {
        for (let i: number = 0; i < keyList.length; i++) {
            sql += ` AND ${keyList[i]} ${opertionList[i]} ?`;
        }
    }

    try {
        const mysql = new MySqlOperate();
        await mysql.connectmysql();
        const data: any = await mysql.querySql(sql, valueList);
        console.log('data', data)
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
});

/**
 * 更新汽车信息
 */
router.post('/editcar', async (req: Request, res: Response) => {
    const result = new ResponseResult();
    const sql = `UPDATE car WHERE id = ?`;
    const paramList = [req.body.id];
    const mysql = new MySqlOperate();
    try {
        await mysql.connectmysql();
        const data: any = mysql.querySql(sql, paramList);
        let responseCode = 200;
        if (!data.affectedRows) {
            result.isOk = false;
            result.message = 'Update car failed.';
            responseCode = 400;
        }
        res.status(responseCode).send(result);
    } catch (error) {
        result.isOk=false;
        result.error=error;
        result.message='There has some system error.';
    }
});

/**
 * 删除汽车信息
 */
router.post('/deletecar', async (req: Request, res: Response) => {
    const sql = `DELETE FROM car WHERE id=?`;
    const paramList = [req.body.id];
    const mysql = new MySqlOperate();
    const result = new ResponseResult();
    try {
        await mysql.connectmysql();
        const data: any = await mysql.querySql(sql, paramList);
        let resCode = 200;
        if (!data.affectedRows) {
            result.isOk = false;
            result.message = 'There is no record be deleted. Delete failed.';
            resCode = 400;
        }
        res.status(resCode).send(result);
    } catch (error) {
        result.isOk = false;
        result.error = error;
        result.message = 'There has some system erro.';
    }
})
export default router;