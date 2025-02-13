import { Pool } from 'mysql2/promise';
import { Equipment } from '../types';

export class EquipmentModel {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    public async findAll(): Promise<Equipment[]> {
        try {
            const [rows] = await this.pool.execute('SELECT * FROM equipment');
            return rows as Equipment[];
        } catch (error: any) {
            throw new Error(`获取设备列表失败: ${error.message}`);
        }
    }

    public async findById(id: number): Promise<Equipment | null> {
        try {
            const [rows] = await this.pool.execute(
                'SELECT * FROM equipment WHERE id = ?',
                [id]
            );
            const equipment = rows as Equipment[];
            return equipment.length ? equipment[0] : null;
        } catch (error: any) {
            throw new Error(`获取设备失败: ${error.message}`);
        }
    }

    public async create(equipment: Omit<Equipment, 'id'>): Promise<Equipment> {
        try {
            const [result] = await this.pool.execute(
                'INSERT INTO equipment (name, type, status, location, last_maintenance, next_maintenance, responsible_member) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [
                    equipment.name,
                    equipment.type,
                    equipment.status,
                    equipment.location,
                    equipment.last_maintenance,
                    equipment.next_maintenance,
                    equipment.responsible_member
                ]
            );

            return {
                id: (result as any).insertId,
                ...equipment
            };
        } catch (error: any) {
            throw new Error(`创建设备失败: ${error.message}`);
        }
    }
}
