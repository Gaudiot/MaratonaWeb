import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '../services/CreateUserService';
import RetrieveUserService from '../services/RetrieveUserService';

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
}

export default UsersController;
