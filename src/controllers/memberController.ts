import { Request, Response } from 'express';
import { MemberModel } from '../models/memberModel';
import Database from '../config/database';

export class MemberController {
    private memberModel: MemberModel;

    constructor() {
        const pool = Database.getInstance().getPool();
        this.memberModel = new MemberModel(pool);
    }

    getMembers = async (req: Request, res: Response) => {
        try {
            const members = await this.memberModel.findAll();
            res.json(members);
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

    getMember = async (req: Request, res: Response) => {
        try {
            const memberId = parseInt(req.params.member_id);
            const member = await this.memberModel.findById(memberId);
            
            if (!member) {
                return res.status(404).json({
                    detail: [{
                        loc: ["path", "member_id"],
                        msg: "Member not found",
                        type: "value_error"
                    }]
                });
            }
            
            res.json(member);
        } catch (error: any) {
            res.status(422).json({
                detail: [{
                    loc: ["path", "member_id"],
                    msg: error.message,
                    type: "value_error"
                }]
            });
        }
    }
}
