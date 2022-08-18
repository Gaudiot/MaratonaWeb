import usersRouter from '../modules/users/routes/users.route';
import { Router } from 'express';

const router = Router();

router.use('/user', usersRouter);

export default router;
