import { Router } from 'express';

import usersRouter from '../modules/users/routes/users.routes';
import authRouter from '../modules/users/routes/auth.routes';
import medalsRouter from '../modules/medals/routes/medals.routes';

const router = Router();

router.use('/user', usersRouter);
router.use('/login', authRouter);
router.use('/medals', medalsRouter);

export default router;
