import { Router } from 'express';
import BlogpostsController from '../controller/BlogpostsController';

const blogpostsRouter = Router();
const blogpostsController = new BlogpostsController();

blogpostsRouter.get('/', blogpostsController.index);
blogpostsRouter.post('/', blogpostsController.create);
blogpostsRouter.put('/:id', blogpostsController.update);
blogpostsRouter.delete('/:id', blogpostsController.delete);

export default blogpostsRouter;

