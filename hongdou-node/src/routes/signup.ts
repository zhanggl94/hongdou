import express from 'express';
import MySqlOperate from '../mysql/mysqlOperate';
const router = express.Router();

router.post('/signup', (req, res) => {
    const sql = `insert into user values(null,?,?)`;
    const paramList = [req.body.username, req.body.password];
    const mysql = new MySqlOperate();
    mysql.querySql(sql, paramList, (error: any, data) => {
        const result = { error: '' };
        if (error) {
            result.error = error;
            res.status(400).send(result);
        } else {
            if (data.affectedRows) {
                // result.error="failed....."
                res.send(result);
            } else {
                result.error = 'create user in db failed.';
                res.status(400).send(result);
            }
        }
    });
    mysql.endmysql();
})

export default router;