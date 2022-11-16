import { Request, Response } from 'express';
import { container } from 'tsyringe';
import RetrieveAllMedalsService from '../services/RetrieveAllMedalsService';

class MedalsController {
	public async retrieveAll(req: Request, res: Response): Promise<Response> {
		const retrieveAllMedalsService = container.resolve(RetrieveAllMedalsService);

		const medals = await retrieveAllMedalsService.execute();

		const medalsQuantity = {
			gold: medals.filter(medal => medal.position === 'gold').length,
			silve: medals.filter(medal => medal.position === 'silver').length,
			bronze: medals.filter(medal => medal.position === 'bronze').length,
			other: medals.filter(medal => medal.position === 'other').length,
		};

		return res.json({
			medals,
			medalsQuantity
		});
	}
}

export default MedalsController;
