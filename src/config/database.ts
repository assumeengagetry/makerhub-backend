import { createPool, Pool } from 'mysql2/promise';

class Database {
    private static instance: Database;
    private pool: Pool;
    
    private readonly dbConfig = {
        host: 'localhost',
        user: 'root',
        password: 'your_password',
        database: 'user_management',
        port: 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    };

    private constructor() {
        this.pool = createPool(this.dbConfig);
        this.testConnection();
    }

    private async testConnection() {
        try {
            const connection = await this.pool.getConnection();
            console.log('数据库连接成功！');
            connection.release();
        } catch (error) {
            console.error('数据库连接失败：', error);
        }
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public getPool(): Pool {
        return this.pool;
    }

    public async query(sql: string, params?: any[]) {
        try {
            const [results] = await this.pool.execute(sql, params);
            return results;
        } catch (error) {
            console.error('查询执行错误：', error);
            throw error;
        }
    }
}

export default Database;