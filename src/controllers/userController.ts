import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import { generateToken } from '../middleware/auth';
import { hashPassword, comparePassword } from '../utils/password';
import { UserRole } from '../types';
import Database from '../config/database';
import { AuthRequest } from '../middleware/auth';

class UserController {
    private userModel: UserModel;

    constructor() {
        const pool = Database.getInstance().getPool();
        this.userModel = new UserModel(pool);
    }

    register = async (req: Request, res: Response) => {
        try {
            const { username, email, password } = req.body;
            
            const existingUser = await this.userModel.findByUsername(username);
            if (existingUser) {
                return res.status(400).json({ message: '用户名已存在' });
            }

            const hashedPassword = await hashPassword(password);
            
            const user = await this.userModel.createUser({
                username,
                email,
                password: hashedPassword,
                role: UserRole.HUIYUAN  // 默认为普通成员
            });

            const token = generateToken(user.id!, user.role, user.username);
            
            res.status(201).json({ 
                message: '注册成功',
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error: any) {
            res.status(500).json({ message: '注册失败', error: error.message });
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;

            const user = await this.userModel.findByUsername(username);
            if (!user) {
                return res.status(401).json({ message: '用户名或密码错误' });
            }

            const isValidPassword = await comparePassword(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: '用户名或密码错误' });
            }

            const token = generateToken(user.id!, user.role, user.username);

            res.json({ 
                message: '登录成功',
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error: any) {
            res.status(500).json({ message: '登录失败', error: error.message });
        }
    }

    getAllUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.userModel.findAll();
            res.json({
                success: true,
                data: users.map(user => ({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }))
            });
        } catch (error: any) {
            res.status(500).json({ 
                success: false, 
                message: '获取用户列表失败', 
                error: error.message 
            });
        }
    }

    getUser = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.params.id);
            const user = await this.userModel.getUser(userId);

            if (!user) {
                return res.status(404).json({ message: '用户不存在' });
            }

            res.json({
                success: true,
                data: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: '获取用户失败',
                error: error.message
            });
        }
    }

    updateUserRole = async (req: AuthRequest, res: Response) => {
        try {
            const { userId } = req.params;
            const { role } = req.body;
            
            if (req.user?.role !== UserRole.HUIZHANG && req.user?.role !== UserRole.CHAOJIHUIZHANG) {
                return res.status(403).json({ 
                    success: false,
                    message: '只有会长和超管可以修改用户权限' 
                });
            }

            if (!Object.values(UserRole).includes(role)) {
                return res.status(400).json({ message: '无效的角色级别' });
            }

            await this.userModel.updateUser(parseInt(userId), { role });
            
            res.json({
                success: true,
                message: '用户权限更新成功'
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: '更新用户权限失败',
                error: error.message
            });
        }
    }

    deleteUser = async (req: AuthRequest, res: Response) => {
        try {
            const userId = parseInt(req.params.id);

            if (req.user?.role !== UserRole.HUIZHANG && req.user?.role !== UserRole.CHAOJIHUIZHANG) {
                return res.status(403).json({
                    success: false,
                    message: '只有会长可以删除用户'
                });
            }

            await this.userModel.deleteUser(userId);
            
            res.json({
                success: true,
                message: '用户删除成功'
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: '删除用户失败',
                error: error.message
            });
        }
    }
}

export default UserController;