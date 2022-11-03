import { Router } from 'express';
import SessionsController from '../controller/SessionsController';

const sessionsRouter = Router();
const sessionsControler = new SessionsController();

sessionsRouter.post('/', sessionsControler.create);

export default sessionsRouter;