import express, { Request, Response } from 'express';
import Bill from '../module/Bill';
import ResponResult from '../module/ResponResult';
import MySqlOperate from '../mysql/mysqlOperate';
import { getQueryObject, getSplicedSQL } from '../utils/util';

const router = express.Router();

/**
 * 创建账单信息
 */
router.post('/create', async (req: Request, res: Response) => {
    const result: ResponResult = new ResponResult();
    const bill: Bill = req.body as Bill;
    const sql: string = `INSERT INTO bill (carId, date, billType, payType, actual, discount, unitPrice, place, note, userId)
    VALUES (?,?,?,?,?,?,?,?,?,?)`;
    const paramList: Array<any> = [bill.carInfo.id, bill.date, bill.billType, bill.payType.toString(), bill.actual, bill.discount, bill.unitPrice, bill.place, bill.note, bill.userId];
    let resCode = 200;
    try {
        const mysql = new MySqlOperate();
        await mysql.connectmysql();
        const data: any = await mysql.querySql(sql, paramList);
        if (!data.affectedRows) {
            resCode = 400;
            result.isOk = false;
            result.message = 'Create bill failed.';
        }
    } catch (error) {
        resCode = 400;
        result.isOk = false;
        result.error = error;
        result.message = 'There has some system errors.';
    }
    res.status(resCode).send(result);
});

/**
 * 查询账单信息
 */
router.post('/search', async (req: Request, res: Response) => {
    const result = new ResponResult();
    const queryObject = getQueryObject(req.body);
    let sql = `SELECT b.*, c.name AS carName FROM bill b INNER JOIN car c ON c.id = b.carId ${getSplicedSQL(queryObject,['b'])} `;
    try {
        const mysql = new MySqlOperate();
        await mysql.connectmysql();
        const data:any = await mysql.querySql(sql, queryObject.valueList);
        let resCode = 200;
        if(data.length){
            result.data = data;
        }else{
            resCode = 400;
        }
        res.status(resCode).send(result);
    } catch (error) {
        result.isOk = false;
        result.error = error;
        result.message = 'There has some system error.';
        res.status(400).send(result);
    }
})



export default router;