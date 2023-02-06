import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CountMedalsService from '../services/CountMedalsService';
import CreateMedalService from '../services/CreateMedalService';
import DeleteMedalService from '../services/DeleteMedalService';
import RetrieveAllMedalsService from '../services/RetrieveAllMedalsService';
import RetrieveMedalService from '../services/RetrieveMedalService';
import UpdateMedalService from '../services/UpdateMedalService';

class MedalsController {
	public async retrieveMedals(req: Request, res: Response): Promise<Response> {
		const retrieveAllMedalsService = container.resolve(RetrieveAllMedalsService);
		const countMedalsService = container.resolve(CountMedalsService);

		const medals = await retrieveAllMedalsService.execute();
		const quantity = await countMedalsService.execute();

		return res.json({
			medals,
			quantity
		});
	}

	public async countMedals(req: Request, res: Response): Promise<Response> {
		const countMedalsService = container.resolve(CountMedalsService);

		const medalsQuantity = await countMedalsService.execute();

		return res.json(medalsQuantity);
	}

	public async retrieve(req: Request, res: Response): Promise<Response>{
		const { id } = req.params;
		const retrieveMedalService =  container.resolve(RetrieveMedalService);

		const medal = await retrieveMedalService.execute({
			id
		});

		return res.json(medal);
	}

	public async create(req: Request, res: Response): Promise<Response>{
		const createMedalService = container.resolve(CreateMedalService);

		const medal = await createMedalService.execute(req.body);

		return res.json(medal);
	}

	public async update(req: Request, res: Response): Promise<Response>{
		const { id } = req.params;
		const { position, contest_name, contest_date, medalist_id } = req.body;

		const updateMedalService = container.resolve(UpdateMedalService);

		const medal = await updateMedalService.execute({
			id,
			position,
			contest_name,
			contest_date,
			medalist_id
		});

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
