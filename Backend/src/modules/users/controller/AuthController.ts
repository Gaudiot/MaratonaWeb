import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthUserService from '../services/AuthUserService';

class AuthController {
	public async create(req: Request, res: Response): Promise<Response> {
		const { email, password } = req.body;

		const authUserService = container.resolve(AuthUserService);

		const {user, token} = await authUserService.execute({
			email,
			password
		});

		return res.json({user, token});
	}
}

export default AuthController;
