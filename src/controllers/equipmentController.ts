import { Request, Response } from 'express';
import { EquipmentModel } from '../models/equipmentModel';
import Database from '../config/database';

export class EquipmentController {
    private equipmentModel: EquipmentModel;

    constructor() {
        const pool = Database.getInstance().getPool();
        this.equipmentModel = new EquipmentModel(pool);
    }

    getEquipment = async (req: Request, res: Response) => {
        try {
            const equipment = await this.equipmentModel.findAll();
            res.json(equipment);
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

    getEquipmentById = async (req: Request, res: Response) => {
        try {
            const equipmentId = parseInt(req.params.equipment_id);
            const equipment = await this.equipmentModel.findById(equipmentId);
            
            if (!equipment) {
                return res.status(422).json({
                    detail: [{
                        loc: ["path", "equipment_id"],
                        msg: "Equipment not found",
                        type: "value_error"
                    }]
                });
            }

            res.json(equipment);
        } catch (error: any) {
            res.status(422).json({
                detail: [{
                    loc: ["path", "equipment_id"],
                    msg: error.message,
                    type: "value_error"
                }]
            });
        }
    }
}
