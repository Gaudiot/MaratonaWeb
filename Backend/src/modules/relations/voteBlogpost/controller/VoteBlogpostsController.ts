import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateVoteBlogpostService from '../services/UpdateVoteBlogpostService';

class VoteBlogpostsController {
	public async update(req: Request, res: Response): Promise<Response> {
		const { user_id, blogpost_id, value } = req.body;

		const updateVoteBlogpostService = container.resolve(UpdateVoteBlogpostService);

		const vote = await updateVoteBlogpostService.execute({
			 user_id,
			 blogpost_id,
			 value
		});

		return res.json({vote});
	}
}

export default VoteBlogpostsController;