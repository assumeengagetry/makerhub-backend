import { Request, Response } from 'express';
import { ProjectModel } from '../models/projectModel';
import Database from '../config/database';
import { AuthRequest } from '../middleware/auth';
import { Project, ProjectStatus } from '../types';

export class ProjectController {
    private projectModel: ProjectModel;

    constructor() {
        const pool = Database.getInstance().getPool();
        this.projectModel = new ProjectModel(pool);
    }

    getProjects = async (req: Request, res: Response) => {
        try {
            const projects = await this.projectModel.findAll();
            res.json(projects); // 直接返回项目数组
        } catch (error: any) {
            res.status(422).json({ 
                detail: [{
                    loc: ["query"],
                    msg: error.message,
                    type: "value_error"
                }]
            });
        }
    }

    getProject = async (req: Request, res: Response) => {
        try {
            const projectId = parseInt(req.params.project_id);
            const project = await this.projectModel.findById(projectId);
            
            if (!project) {
                return res.status(422).json({
                    detail: [{
                        loc: ["path", "project_id"],
                        msg: "Project not found",
                        type: "value_error"
                    }]
                });
            }

            res.json(project);
        } catch (error: any) {
            res.status(422).json({
                detail: [{
                    loc: ["path", "project_id"],
                    msg: error.message,
                    type: "value_error"
                }]
            });
        }
    }

    createProject = async (req: AuthRequest, res: Response) => {
        try {
            const { name, description, deadline } = req.body;
            if (!req.user) {
                return res.status(401).json({ message: '未授权' });
            }

            const project = await this.projectModel.create({
                name,
                description,
                status: ProjectStatus.PLANNING,
                leader: req.user.username,
                members: [req.user.username],
                tech_stack: [],
                progress: 0,
                start_date: new Date().toISOString().split('T')[0],
                deadline,
                budget: 0,
                equipment: [],
                achievements: []
            });
            
            res.status(201).json(project);
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
