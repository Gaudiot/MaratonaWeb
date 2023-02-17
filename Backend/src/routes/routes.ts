import { Router } from 'express';

import usersRouter from '../modules/users/routes/users.routes';
import authRouter from '../modules/users/routes/auth.routes';
import medalsRouter from '../modules/medals/routes/medal.routes';
import blogpostsRouter from '../modules/blogpost/routes/blogposts.routes';
import relationsRouter from '../modules/relations/routes/routes';

const router = Router();

router.use('/user', usersRouter);
router.use('/login', authRouter);
router.use('/medal', medalsRouter);
router.use('/blogpost', blogpostsRouter);
router.use('/vote', relationsRouter);

export default router;
