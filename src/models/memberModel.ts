import { Pool } from 'mysql2/promise';
import { Member } from '../types';

export class MemberModel {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    public async findAll(): Promise<Member[]> {
        try {
            const [rows] = await this.pool.execute('SELECT * FROM members');
            return rows as Member[];
        } catch (error: any) {
            throw new Error(`获取成员列表失败: ${error.message}`);
        }
    }

    public async findById(id: number): Promise<Member | null> {
        try {
            const [rows] = await this.pool.execute(
                'SELECT * FROM members WHERE id = ?',
                [id]
            );
            const members = rows as Member[];
            return members.length ? members[0] : null;
        } catch (error: any) {
            throw new Error(`获取成员失败: ${error.message}`);
        }
    }

    public async create(member: Omit<Member, 'id'>): Promise<Member> {
        try {
            const [result] = await this.pool.execute(
                'INSERT INTO members (name, role, skills, join_date, projects) VALUES (?, ?, ?, ?, ?)',
                [
                    member.name,
                    member.role,
                    JSON.stringify(member.skills),
                    member.join_date,
                    JSON.stringify(member.projects)
                ]
            );

            return {
                id: (result as any).insertId,
                ...member
            };
        } catch (error: any) {
            throw new Error(`创建成员失败: ${error.message}`);
        }
    }
}
