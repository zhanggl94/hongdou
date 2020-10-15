import mysql, { Connection, MysqlError, queryCallback } from 'mysql';
import mysqlConfig from '../config/mysql';

class MySqlOperate {
    private connection: Connection;

    constructor() {
        this.connection = this.connectmysql();
    }

    private connectmysql = (): Connection => {
        const connection: Connection = mysql.createConnection({
            host: mysqlConfig.host,
            port: mysqlConfig.port,
            user: mysqlConfig.username,
            password: mysqlConfig.password,
            database: mysqlConfig.database
        });

        connection.connect((error: MysqlError) => {
            if (error) {
                console.log(`Connect mysql failed. error${error}`);
            } else {
                console.log('Connect mysql success.')
            }

        })
        return connection;
    }

    public querySql = (sql: string, paramList: any, callback: queryCallback) => {
        this.connection.query(sql, paramList, (error, data) => {
            if (error) {
                console.log(`Query sql failed.error:${error}`);
                callback(error, null);
            } else {
                callback(null, data);
            }
        })
    }

    public endmysql = () => {
        this.connection.end((error?: MysqlError) => {
            if(error){
                console.log(`End mysql failed.error:${error}`);
            }else{
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