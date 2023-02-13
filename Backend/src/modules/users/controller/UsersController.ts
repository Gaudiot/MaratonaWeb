import { Request, Response } from 'express';
import { container } from 'tsyringe';

import RetrieveUserService from '../services/RetrieveUserService';
import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';
import DeleteUserService from '../services/DeleteUserService';
import IndexUserService from '../services/IndexUserService';

class UsersController {
	public async index(req: Request, res: Response): Promise<Response>{
		const indexUserService = container.resolve(IndexUserService);

		const users = await indexUserService.execute();

		return res.json(users);
	}

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
		const { username, email, role } = req.body;

		const updateUserService = container.resolve(UpdateUserService);

		const user = await updateUserService.execute({
			id,
			username,
			email,
			role
		});

		return res.json(user);
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		const { id: user_id } = req.params;

		const deleteUserService = container.resolve(DeleteUserService);

		await deleteUserService.execute({
			user_id
		});

		return res.sendStatus(204);
	}
}

export default UsersController;
