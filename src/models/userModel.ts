import { Pool } from 'mysql2/promise';
import { User, UserRole } from '../types';

export class UserModel {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    public async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
        try {
            const [result] = await this.pool.execute(
                'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
                [userData.username, userData.email, userData.password, userData.role]
            );

            return {
                ...userData,
                id: (result as any).insertId,
                createdAt: new Date(),
                updatedAt: new Date()
            };
        } catch (error: any) {
            throw new Error(`创建用户失败: ${error.message}`);
        }
    }

    // 获取用户
    public async getUser(id: number): Promise<User | null> {
        try {
            const [rows] = await this.pool.execute(
                'SELECT * FROM users WHERE id = ?',
                [id]
            );
            const users = rows as User[];
            return users.length ? users[0] : null;
        } catch (error: any) {
            throw new Error(`获取用户失败: ${error.message}`);
        }
    }

    public async updateUser(id: number, userData: Partial<User>): Promise<void> {
        try {
            const updates: string[] = [];
            const values: any[] = [];

            Object.entries(userData).forEach(([key, value]) => {
                if (value !== undefined && key !== 'id') {
                    updates.push(`${key} = ?`);
                    values.push(value);
                }
            });

            if (updates.length === 0) return;

            values.push(id);
            await this.pool.execute(
                `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
                values
            );
        } catch (error: any) {
            throw new Error(`更新用户失败: ${error.message}`);
        }
    }

    // 删除用户
    public async deleteUser(id: number): Promise<void> {
        try {
            await this.pool.execute(
                'DELETE FROM users WHERE id = ?',
                [id]
            );
        } catch (error: any) {
            throw new Error(`删除用户失败: ${error.message}`);
        }
    }

    // 查找所有用户
    public async findAll(): Promise<User[]> {
        try {
            const [rows] = await this.pool.execute(
                'SELECT id, username, email, role, created_at as createdAt, updated_at as updatedAt FROM users'
            );
            return rows as User[];
        } catch (error: any) {
            throw new Error(`获取用户列表失败: ${error.message}`);
        }
    }

    // 通过用户名查找用户
    public async findByUsername(username: string): Promise<User | null> {
        try {
            const [rows] = await this.pool.execute(
                'SELECT * FROM users WHERE username = ?',
                [username]
            );
            const users = rows as User[];
            return users.length ? users[0] : null;
        } catch (error: any) {
            throw new Error(`查找用户失败: ${error.message}`);
        }
    }
}

export type { User };
