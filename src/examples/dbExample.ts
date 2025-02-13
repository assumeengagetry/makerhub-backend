import Database from '../config/database';

async function testDatabaseConnection() {
    const db = Database.getInstance();
    
    try {
        // 示例查询
        const results = await db.query('SELECT * FROM users LIMIT 1');
        console.log('查询结果：', results);
        
        // 示例插入
        const insertResult = await db.query(
            'INSERT INTO users (username, email) VALUES (?, ?)',
            ['testuser', 'test@example.com']
        );
        console.log('插入结果：', insertResult);
        
    } catch (error) {
        console.error('数据库操作错误：', error);
    }
}

// 运行测试
testDatabaseConnection();
