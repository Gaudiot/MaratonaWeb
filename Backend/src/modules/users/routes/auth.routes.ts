import { Router } from 'express';
import AuthController from '../controller/AuthController';

const authRouter = Router();
const authControler = new AuthController();

authRouter.post('/', authControler.create);

export default authRouter;