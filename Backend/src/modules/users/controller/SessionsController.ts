import { Request, Response } from 'express';

class SessionsController {
	public async create(req: Request, res: Response) {
		const { email, password } = req.body;

		// TODO create authentication method with JWT

		return res.json();
	}
}

export default SessionsController;
