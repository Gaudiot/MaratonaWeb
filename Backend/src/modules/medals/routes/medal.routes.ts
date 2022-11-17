import { Router } from 'express';
import MedalsController from '../controller/MedalsController';

const medalRouter = Router();
const medalsController = new MedalsController();

medalRouter.post('/', medalsController.create);
medalRouter.delete('/:id', medalsController.delete);

export default medalRouter;