import { inject, injectable } from 'tsyringe';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserRepository from '../repositories/interfaces/IUserRepository';

@injectable()
class CreateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUserRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider
	) {}

	public async execute({email, username, password}: ICreateUserDTO): Promise<User> {
		const userExists = await this.usersRepository.findByEmail(email);

		if(userExists){
			throw new Error('Account already registered');
		}

		const hashedPassword = await this.hashProvider.generateHash(password);

		const user = await this.usersRepository.create({
			email,
			username,
			password: hashedPassword
		});

		return user;
	}
}

export default CreateUserService;
