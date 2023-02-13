import { inject, injectable } from 'tsyringe';

import User from '../entities/User';

import IUserRepository from '../repositories/interfaces/IUserRepository';

@injectable()
class IndexUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUserRepository,
	) {}

	public async execute(): Promise<User[]> {
		const users = await this.usersRepository.retrieveAll();

		return users;
	}
}

export default IndexUserService;
