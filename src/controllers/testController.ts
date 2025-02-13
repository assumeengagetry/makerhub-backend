import { Request, Response } from 'express';
import { ProjectModel } from '../models/projectModel';
import Database from '../config/database';
import { ProjectStatus } from '../types';

export class TestController {
    private projectModel: ProjectModel;

    constructor() {
        const pool = Database.getInstance().getPool();
        this.projectModel = new ProjectModel(pool);
    }

    generateTestProject = async (req: Request, res: Response) => {
        try {
            const testProject = await this.projectModel.create({
                name: '测试项目',
                description: '这是一个自动生成的测试项目',
                status: ProjectStatus.PLANNING,
                leader: '测试用户',
                members: ['测试用户'],
                tech_stack: [],
                progress: 0,
                start_date: new Date().toISOString().split('T')[0],
                deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                budget: 0,
                equipment: [],
                achievements: []
            });
            res.json(testProject);
        } catch (error: any) {
            res.status(422).json({
                detail: [{
                    loc: ["body"],
                    msg: error.message,
                    type: "value_error"
                }]
            });
        }
    }
}
