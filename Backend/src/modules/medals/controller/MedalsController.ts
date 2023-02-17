import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMedalService from '../services/CreateMedalService';
import DeleteMedalService from '../services/DeleteMedalService';
import IndexMedalService from '../services/IndexMedalService';
import RetrieveMedalService from '../services/RetrieveMedalService';
import UpdateMedalService from '../services/UpdateMedalService';

class MedalsController {
	public async index(req: Request, res: Response): Promise<Response> {
		const indexMedalService = container.resolve(IndexMedalService);

		const allMedals = await indexMedalService.execute();

		return res.json(allMedals);
	}

	public async retrieve(req: Request, res: Response): Promise<Response>{
		const { id } = req.params;
		const retrieveMedalService = container.resolve(RetrieveMedalService);

		const medal = await retrieveMedalService.execute({
			medal_id: id,
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

		const medal = await updateMedalService.execute({id, ...req.body});

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
