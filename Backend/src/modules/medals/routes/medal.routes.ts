import { Router } from 'express';
import MedalsController from '../controller/MedalsController';

const medalRouter = Router();
const medalsController = new MedalsController();

medalRouter.get('/:id', medalsController.retrieve);
medalRouter.post('/', medalsController.create);
medalRouter.put('/:id', medalsController.update);
medalRouter.delete('/:id', medalsController.delete);

export default medalRouter;