import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateMedalService from '../services/CreateMedalService';
import DeleteMedalService from '../services/DeleteMedalService';
import RetrieveAllMedalsService from '../services/RetrieveAllMedalsService';

class MedalsController {
	public async retrieveAll(req: Request, res: Response): Promise<Response> {
		const retrieveAllMedalsService = container.resolve(RetrieveAllMedalsService);

		const medals = await retrieveAllMedalsService.execute();

		const medalsQuantity = {
			gold: medals.filter(medal => medal.position === 'gold').length,
			silver: medals.filter(medal => medal.position === 'silver').length,
			bronze: medals.filter(medal => medal.position === 'bronze').length,
			other: medals.filter(medal => medal.position === 'other').length,
		};

		return res.json({
			medals,
			medalsQuantity
		});
	}

	public async create(req: Request, res: Response): Promise<Response>{
		const createMedalService = container.resolve(CreateMedalService);

		const medal = await createMedalService.execute(req.body);

		return res.json(medal);
	}

	public async delete(req: Request, res: Response): Promise<Response>{
		const deleteMedalService = container.resolve(DeleteMedalService);
		const {medal_id} = req.body;

		deleteMedalService.execute({
			medal_id
		});

		return res.status(204).json();
	}
}

export default MedalsController;
