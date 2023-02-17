import { Router } from 'express';

import VoteBlogpostsController from '../controller/VoteBlogpostsController';

const voteBlogpostRouter = Router();
const voteBlogpostsController = new VoteBlogpostsController();

voteBlogpostRouter.patch('/', voteBlogpostsController.update);

export default voteBlogpostRouter;