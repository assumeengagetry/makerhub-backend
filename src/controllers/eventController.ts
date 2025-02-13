import { Request, Response } from 'express';
import { EventModel } from '../models/eventModel';
import Database from '../config/database';

export class EventController {
    private eventModel: EventModel;

    constructor() {
        const pool = Database.getInstance().getPool();
        this.eventModel = new EventModel(pool);
    }

    getEvents = async (req: Request, res: Response) => {
        try {
            const events = await this.eventModel.findAll();
            res.json(events);
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

    getEvent = async (req: Request, res: Response) => {
        try {
            const eventId = parseInt(req.params.event_id);
            const event = await this.eventModel.findById(eventId);
            
            if (!event) {
                return res.status(422).json({
                    detail: [{
                        loc: ["path", "event_id"],
                        msg: "Event not found",
                        type: "value_error"
                    }]
                });
            }

            res.json(event);
        } catch (error: any) {
            res.status(422).json({
                detail: [{
                    loc: ["path", "event_id"],
                    msg: error.message,
                    type: "value_error"
                }]
            });
        }
    }
}
