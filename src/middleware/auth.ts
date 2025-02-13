import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../types';
import dotenv from 'dotenv';

dotenv.config();

// 从环境变量获取JWT配置
const JWT_SECRET = '_assume060801Xsk_'; //process.env.JWT_SECRET;我这么写是非法的，但是开发中别管那么多

// 扩展Request接口，添加用户信息
export interface AuthRequest extends Request {
    user?: {
        id: number;
        username: string;
        role: UserRole;
    };
}

// 生成JWT令牌的函数
export const generateToken = (userId: number, role: UserRole, username: string): string => {
    return jwt.sign(
        { id: userId, role, username },
        JWT_SECRET,
        { expiresIn: '24h' }
    );
};

// 权限验证中间件
export const authMiddleware = (requiredRole?: UserRole) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        // 从请求头中获取令牌
        const token = req.headers.authorization?.split(' ')[1];

        // 如果没有提供令牌，返回401错误
        if (!token) {
            return res.status(401).json({ message: '未提供身份验证令牌' });
        }

        try {
            // 验证令牌有效性
            const decoded = jwt.verify(token, JWT_SECRET) as AuthRequest['user'];
            // 将解码后的用户信息添加到请求对象中
            req.user = decoded;

            // 如果指定了所需权限，检查用户权限是否足够
            if (requiredRole && req.user && req.user.role !== requiredRole) {
                return res.status(403).json({ message: '权限不足' });
            }

            // 通过验证，继续处理请求
            next();
        } catch (error) {
            // 令牌无效或已过期
            res.status(401).json({ message: '身份验证失败' });
        }
    };
};
