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
		const emailExists = await this.usersRepository.findByEmail(email);

		if(emailExists){
			throw new Error('E-mail address already registered');
		}

		const usernameExists = await this.usersRepository.findByUsername(username);

		if(usernameExists){
			throw new Error('Username already in use');
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
