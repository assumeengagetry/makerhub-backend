import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/apiRoutes'; // 更新引用路径
import Database from './config/database';

// 初始化数据库连接
Database.getInstance();

const app = express();

// 配置允许的域名
const allowedOrigins = [
    'http://yourdomain.com',      // 你的实际域名
    'http://localhost:3000',      // 本地开发环境
    'http://127.0.0.1:3000'       // 本地开发环境
];

// 更详细的 CORS 配置
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('不允许的来源'));
        }
    },
    credentials: true
}));

// 添加中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 注册路由
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});

export default app;