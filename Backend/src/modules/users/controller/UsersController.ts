import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import RetrieveUserService from '../services/RetrieveUserService';
import UpdateUserService from '../services/UpdateUserService';

class UsersController {
	public async retrieve(req: Request, res: Response): Promise<Response>{
		const { id: user_id } = req.params;

		const retrieveUserService = container.resolve(RetrieveUserService);

		const user = await retrieveUserService.execute({
			user_id
		});

		return res.json(user);
	}

	public async create(req: Request, res: Response): Promise<Response> {
		const { username, email, password } = req.body;

		const createUserService = container.resolve(CreateUserService);

		const user = await createUserService.execute({
			username,
			email,
			password
		});

		return res.json(user);
	}

	public async update(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const { username, email } = req.body;

		const updateUserService = container.resolve(UpdateUserService);

		const user = await updateUserService.execute({
			id,
			username,
			email,
		});

		return res.json(user);
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		const { id: user_id } = req.params;

		const createUserService = container.resolve(DeleteUserService);

		await createUserService.execute({
			user_id
		});

		return res.sendStatus(204);
	}
}

export default UsersController;
