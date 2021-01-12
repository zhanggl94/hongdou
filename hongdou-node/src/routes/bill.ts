import express, { Request, Response } from 'express';
import mysql from '../config/mysql';
import Bill from '../module/Bill';
import ResponResult from '../module/ResponResult';
import MySqlOperate from '../mysql/mysqlOperate';
import { getQueryObject, getSplicedSQL } from '../utils/util';

const router = express.Router();

const INSERT_Bill_SQL: string = `INSERT INTO bill (carId, date, billType, payType, actual, discount, unitPrice, place, note, userId) VALUES `;

/**
 * 创建账单信息
 */
router.post('/create', async (req: Request, res: Response) => {
    const result: ResponResult = new ResponResult();
    const bill: Bill = req.body as Bill;
    const sql: string = INSERT_Bill_SQL + `(?,?,?,?,?,?,?,?,?,?)`;
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
    let sql = `SELECT b.*, c.name AS carName FROM bill b INNER JOIN car c ON c.id = b.carId ${getSplicedSQL(queryObject, ['b'])} `;
    try {
        const mysql = new MySqlOperate();
        await mysql.connectmysql();
        const data: any = await mysql.querySql(sql, queryObject.valueList);
        let resCode = 200;
        if (data.length) {
            result.data = data;
        }
        res.status(resCode).send(result);
    } catch (error) {
        result.isOk = false;
        result.error = error;
        result.message = 'There has some system error.';
        res.status(400).send(result);
    }
});

/**
 * 账单编辑
 */
router.post('/edit', async (req: Request, res: Response) => {
    const result = new ResponResult();
    // const sql = `UPDATE FROM bill (carId, date, billType, payType, actual, discount, unitPrice, place, note, userId)
    // VALUES (?,?,?,?,?,?,?,?,?,?) WHERE id = ?`;
    const sql = `UPDATE bill SET carId = ?, date = ?, billType = ?, payType = ?, actual = ?, 
    discount = ?, unitPrice = ?, place = ?, note = ?, userId = ?
    WHERE id = ?`;
    const bill: Bill = req.body as Bill;
    const paramList: Array<any> = [bill.carInfo.id, bill.date, bill.billType, bill.payType.toString(), bill.actual, bill.discount, bill.unitPrice, bill.place, bill.note, bill.userId, bill.id];
    let resCode = 200;
    try {
        const mysql = new MySqlOperate();
        const data: any = await mysql.querySql(sql, paramList);
        if (!data.affectedRows) {
            resCode = 400;
            result.isOk = false;
            result.message = 'Update bill failed.';
        }
    } catch (error) {
        resCode = 400;
        result.isOk = false;
        result.error = error;
        result.message = 'There has some system error.';
    } finally {
        res.status(resCode).send(result);
    }
});

/**
 * 账单删除
 */
router.post('/delete', async (req: Request, res: Response) => {
    const result = new ResponResult();
    const sql = `DELETE FROM bill WHERE id = ?`;
    const paramList = [req.body.id];
    let resCode = 200;
    try {
        const mysql = new MySqlOperate();
        const data: any = await mysql.querySql(sql, paramList);
        if (!data.affectedRows) {
            resCode = 400;
            result.isOk = false;
            result.message = 'Delete bill failed.';
        }
    } catch (error) {
        resCode = 400;
        result.isOk = false;
        result.error = error;
        result.message = 'There has some system error.';
    } finally {
        res.status(resCode).send(result);
    }
});

/**
 * 导入数据
 */
router.post('/import', async (req: Request, res: Response) => {
    const result = new ResponResult();
    if (req.body) {
        const mysql = new MySqlOperate();
        const carList = getCarList(req.body);
        // 判断汽车信息是否存在，存在查询汽车信息的id，不存在新建汽车信息，并获取id
        if (carList.length) {
            for (const car of carList) {
                const carName = car.name;
                const currUserId = car.userId;
                try {
                    await mysql.connectmysql();
                    const carData: any = await checkCarName(mysql, [carName, currUserId]);
                    if (carData?.[0]?.id) {
                        car['id'] = carData[0].id;
                    } else {
                        // name,brand,isDefault,note, userId
                        const newCarData = await insertCar(mysql, [carName, 9999, 0, 'Excle import', currUserId]);
                        console.log('newCarData', newCarData);
                        car['id'] = newCarData.insertId;
                    }
                } catch (error) {
                    result.isOk = false;
                    result.message = 'There has some system errors.';
                    result.error = error;
                    // mysql.endmysql();
                }
            }
        } else {
            result.isOk = false;
            result.message = 'The car info is null.';
        }

        if (result.isOk) {
            let excelInsertSQL = INSERT_Bill_SQL;
            let paramList: Array<any> = [];
            for (let billInfo of req.body) {
                excelInsertSQL += '(?,?,?,?,?,?,?,?,?,?),';
                // carId, date, billType, payType, actual, discount, unitPrice, place, note, userId
                const carInfo = carList.find((item: any) => item.name === billInfo.carName);
                paramList = paramList.concat([carInfo.id, billInfo.date, billInfo.billType, billInfo.payType, billInfo.actual, billInfo.discount, billInfo.unitPrice, billInfo.place, billInfo.note, carInfo.userId]);
            }
            if (excelInsertSQL.endsWith(',')) {
                excelInsertSQL = excelInsertSQL.slice(0, excelInsertSQL.length - 1);
            }
            console.log('excelIn',excelInsertSQL);
            console.log('paramList',paramList);
            // try {
            //     const data: any = await mysql.querySql(excelInsertSQL, paramList);
            //     if (!data.affectedRows) {
            //         result.isOk = false;
            //         result.message = 'Insert bill info failed.';
            //     }
            // } catch (error) {
            //     result.isOk = false;
            //     result.message = 'There has some system errors.';
            //     result.error = error;
            //     mysql.endmysql();
            // }
        }
        mysql.endmysql();
    } else {
        result.isOk = false;
        result.message = 'The body is null.';
    }
    const resCode:number = result.isOk ? 200 : 400;
    res.status(resCode).send(result);
});

/**
 * Excel导入的数据，汽车信息去重
 * @param body 
 */
const getCarList = (body: Array<object>): Array<any> => {
    return body.reduce((acc: any, cur: any) => {
        if (!acc.find((itme: any) => itme.name === cur.carName && itme.userId === cur.userId)) {
            acc.push({ name: cur.carName, userId: cur.userId });
        }
        return acc;
    }, []);
}

/**
 * 检查汽车信息是否已经存在
 * @param mysql 
 * @param paramList 
 */
const checkCarName = async (mysql: MySqlOperate, paramList: Array<string>): Promise<any> => {
    const sql = `SELECT id FROM car WHERE name = ? AND userId = ?`;
    return new Promise(async (resolve: any, reject: any) => {
        try {
            resolve(await mysql.querySql(sql, paramList));
        } catch (error) {
            reject(error);
        }
    })
}

/**
 * 当汽车信息不存在时，新建汽车信息
 * @param mysql 
 * @param paramList 
 */
const insertCar = async (mysql: MySqlOperate, paramList: Array<string>): Promise<any> => {
    const sql = `INSERT INTO car (name,brand,isDefault,note, userId) VALUES (?,?,?,?,?)`;
    return new Promise(async (resolve: any, reject: any) => {
        try {
            resolve(await mysql.querySql(sql, paramList));
        } catch (error) {
            reject(error);
        }
    })
}

export default router;