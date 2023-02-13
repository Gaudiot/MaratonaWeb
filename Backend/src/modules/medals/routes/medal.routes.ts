import { Router } from 'express';
import MedalsController from '../controller/MedalsController';

const medalsRouter = Router();
const medalsController = new MedalsController();

medalsRouter.get('/', medalsController.index);
medalsRouter.get('/:id', medalsController.retrieve);
medalsRouter.post('/', medalsController.create);
medalsRouter.put('/:id', medalsController.update);
medalsRouter.delete('/:id', medalsController.delete);

export default medalsRouter;