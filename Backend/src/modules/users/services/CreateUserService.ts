import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

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
			throw new AppError('Email already registered', 409);
		}

		const usernameExists = await this.usersRepository.findByUsername(username);

		if(usernameExists){
			throw new AppError('Username already in use', 409);
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
