import mysql, { Connection, MysqlError, queryCallback } from 'mysql';
import mysqlConfig from '../config/mysql';

class MySqlOperate {
    private connection: Connection;

    constructor() {
        this.connection = mysql.createConnection({
            host: mysqlConfig.host,
            port: mysqlConfig.port,
            user: mysqlConfig.username,
            password: mysqlConfig.password,
            database: mysqlConfig.database
        });
    }

    public connectmysql = () => {
        return new Promise((resolve, reject) => {
            this.connection.connect((error: MysqlError) => {
                if (error) {
                    console.log(`Connect mysql failed. error${error}`);
                    reject(error);
                } else {
                    console.log('Connect mysql success.')
                    resolve();
                }

            })
        })
    }

    public querySql = (sql: string, paramList: Array<string>) => {
        console.log(sql, paramList)
        return new Promise((resolve: any, reject: any) => {
            this.connection.query(sql, paramList, (error, data) => {
                if (error) {
                    console.log(`Query sql failed.${error}`);
                    reject(error);
                } else {
                    resolve(data);
                }
            })
        })
    }

    public endmysql = () => {
        this.connection.end((error?: MysqlError) => {
            if (error) {
                console.log(`End mysql failed.${error}`);
            } else {
                console.log(`End mysql success.`);
            }
        })
    }

    public destorymysql = () => {
        if (this.connection) {
            this.connection.destroy();
        }
    }
}

export default MySqlOperate;