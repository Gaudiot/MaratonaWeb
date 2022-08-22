import { Router } from 'express';
import UsersController from '../controller/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.get('/:id', usersController.retrieve);
usersRouter.post('/', usersController.create);
usersRouter.delete('/:id', usersController.delete);

export default usersRouter;
