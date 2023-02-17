import { Router } from 'express';
import voteBlogpostRouter from '../voteBlogpost/routes/voteBlogpost.routes';

const relationsRouter = Router();

relationsRouter.use('/blogpost', voteBlogpostRouter);

export default relationsRouter;