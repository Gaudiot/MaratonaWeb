import usersRouter from '../modules/users/routes/users.routes';
import { Router } from 'express';
import sessionsRouter from '../modules/users/routes/sessions.routes';

const router = Router();

router.use('/user', usersRouter);
router.use('/session', sessionsRouter);

export default router;
