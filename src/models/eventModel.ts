import { Pool } from 'mysql2/promise';
import { Event } from '../types';

export class EventModel {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    public async findAll(): Promise<Event[]> {
        try {
            const [rows] = await this.pool.execute('SELECT * FROM events');
            return rows as Event[];
        } catch (error: any) {
            throw new Error(`获取活动列表失败: ${error.message}`);
        }
    }

    public async findById(id: number): Promise<Event | null> {
        try {
            const [rows] = await this.pool.execute(
                'SELECT * FROM events WHERE id = ?',
                [id]
            );
            const events = rows as Event[];
            return events.length ? events[0] : null;
        } catch (error: any) {
            throw new Error(`获取活动失败: ${error.message}`);
        }
    }

    public async create(event: Omit<Event, 'id'>): Promise<Event> {
        try {
            const [result] = await this.pool.execute(
                'INSERT INTO events (title, type, date, location, description, capacity, registered, status, organizer, requirements, materials) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    event.title,
                    event.type,
                    event.date,
                    event.location,
                    event.description,
                    event.capacity,
                    event.registered,
                    event.status,
                    event.organizer,
                    JSON.stringify(event.requirements),
                    JSON.stringify(event.materials)
                ]
            );

            return {
                id: (result as any).insertId,
                ...event
            };
        } catch (error: any) {
            throw new Error(`创建活动失败: ${error.message}`);
        }
    }
}
