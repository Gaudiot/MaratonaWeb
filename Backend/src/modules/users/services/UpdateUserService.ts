import { inject, injectable } from 'tsyringe';

import IUpdateUserDTO from '../dtos/IUpdateUserDTO';
import User from '../entities/User';
import IUserRepository from '../repositories/interfaces/IUserRepository';

@injectable()
class CreateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUserRepository,
	) {}

	public async execute(userData: IUpdateUserDTO): Promise<User> {
		const user = await this.usersRepository.updateById(userData);

		if(!user){
			throw new Error('User not found');
		}

		return user;
	}
}

export default CreateUserService;
