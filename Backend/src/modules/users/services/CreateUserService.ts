import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../entities/User';
import IUserRepository from '../repositories/interfaces/IUserRepository';

@injectable()
class CreateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUserRepository,
	) {}

	public async execute(userData: ICreateUserDTO): Promise<User> {
		const userExists = await this.usersRepository.findByEmail(userData.email);

		if(userExists){
			throw new Error('Account already registered');
		}

		const user = await this.usersRepository.create(userData);

		return user;
	}
}

export default CreateUserService;
