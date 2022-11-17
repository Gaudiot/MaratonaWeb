import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CountMedalsService from '../services/CountMedalsService';
import CreateMedalService from '../services/CreateMedalService';
import DeleteMedalService from '../services/DeleteMedalService';
import RetrieveAllMedalsService from '../services/RetrieveAllMedalsService';

class MedalsController {
	public async retrieveMedals(req: Request, res: Response): Promise<Response> {
		const retrieveAllMedalsService = container.resolve(RetrieveAllMedalsService);

		const medals = await retrieveAllMedalsService.execute();

		return res.json(medals);
	}

	public async countMedals(req: Request, res: Response): Promise<Response> {
		const countMedalsService = container.resolve(CountMedalsService);

		const medalsQuantity = await countMedalsService.execute();

		return res.json(medalsQuantity);
	}

	public async create(req: Request, res: Response): Promise<Response>{
		const createMedalService = container.resolve(CreateMedalService);

		const medal = await createMedalService.execute(req.body);

		return res.json(medal);
	}

	public async delete(req: Request, res: Response): Promise<Response>{
		const { id: medal_id } = req.params;
		
		const deleteMedalService = container.resolve(DeleteMedalService);

		await deleteMedalService.execute({
			medal_id
		});

		return res.sendStatus(204);
	}
}

export default MedalsController;
