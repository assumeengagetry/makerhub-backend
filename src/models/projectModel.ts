import { Pool } from 'mysql2/promise';
import { Project, ProjectStatus } from '../types';

export class ProjectModel {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    public async findAll(): Promise<Project[]> {
        try {
            const [rows] = await this.pool.execute('SELECT * FROM projects');
            return (rows as any[]).map(project => ({
                ...project,
                members: JSON.parse(project.members || '[]'),
                tech_stack: JSON.parse(project.tech_stack || '[]'),
                equipment: JSON.parse(project.equipment || '[]'),
                achievements: JSON.parse(project.achievements || '[]')
            }));
        } catch (error: any) {
            throw new Error(`获取项目列表失败: ${error.message}`);
        }
    }

    public async findById(id: number): Promise<Project | null> {
        try {
            const [rows] = await this.pool.execute(
                'SELECT * FROM projects WHERE id = ?',
                [id]
            );
            const projects = rows as any[];
            if (!projects.length) return null;

            const project = projects[0];
            return {
                ...project,
                members: JSON.parse(project.members || '[]'),
                tech_stack: JSON.parse(project.tech_stack || '[]'),
                equipment: JSON.parse(project.equipment || '[]'),
                achievements: JSON.parse(project.achievements || '[]')
            };
        } catch (error: any) {
            throw new Error(`获取项目失败: ${error.message}`);
        }
    }

    public async create(project: Omit<Project, 'id'>): Promise<Project> {
        try {
            const [result] = await this.pool.execute(
                'INSERT INTO projects (name, description, status, leader, members, tech_stack, progress, start_date, deadline, budget, equipment, achievements) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    project.name,
                    project.description,
                    project.status,
                    project.leader,
                    JSON.stringify(project.members),
                    JSON.stringify(project.tech_stack),
                    project.progress,
                    project.start_date,
                    project.deadline,
                    project.budget,
                    JSON.stringify(project.equipment),
                    JSON.stringify(project.achievements)
                ]
            );
            
            return {
                id: (result as any).insertId,
                ...project
            };
        } catch (error: any) {
            throw new Error(`创建项目失败: ${error.message}`);
        }
    }
}
