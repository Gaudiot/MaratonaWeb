import { Request, Response, Router } from 'express';

const tempRouter = Router();

tempRouter.get('/', (req: Request, res: Response) => {
	res.json({'tmp': 'funcionando o get'});
});

tempRouter.post('/', (req: Request, res: Response) => {
	res.json({'tmp': 'funcionando o post'});
});

export default tempRouter;