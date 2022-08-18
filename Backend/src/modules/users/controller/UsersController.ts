import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '../services/CreateUserService';

class UsersController {
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
