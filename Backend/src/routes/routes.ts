import usersRouter from '../modules/users/routes/users.routes';
import { Router } from 'express';
import authRouter from '../modules/users/routes/auth.routes';

const router = Router();

router.use('/user', usersRouter);
router.use('/login', authRouter);

export default router;
