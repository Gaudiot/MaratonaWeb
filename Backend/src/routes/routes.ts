import { Router } from 'express';

const router = Router();

import tempRouter from './temp';

router.use('/temp', tempRouter);

export default router;