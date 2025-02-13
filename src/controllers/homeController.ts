import { Request, Response } from 'express';

export class HomeController {
    home = (req: Request, res: Response) => {
        res.json({}); // 返回空对象
    }
}
