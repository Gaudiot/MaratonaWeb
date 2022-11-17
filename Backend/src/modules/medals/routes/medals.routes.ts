import { Router } from 'express';
import MedalsController from '../controller/MedalsController';

const medalsRouter = Router();
const medalsController = new MedalsController();

medalsRouter.get('/', medalsController.retrieveMedals);
medalsRouter.get('/count', medalsController.countMedals);

export default medalsRouter;