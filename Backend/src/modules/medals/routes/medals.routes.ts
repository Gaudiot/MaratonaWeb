import { Router } from 'express';
import MedalsController from '../controller/MedalsController';

const medalsRouter = Router();
const medalsController = new MedalsController();

medalsRouter.get('/', medalsController.retrieveAll);

export default medalsRouter;