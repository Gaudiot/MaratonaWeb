import { Request, Response, Router } from 'express';
import UsersController from '../controller/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post('/', (req: Request, res: Response) => {
	usersController.create(req, res);
});

export default usersRouter;
