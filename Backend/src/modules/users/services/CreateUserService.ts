import bcrypt from 'bcrypt';

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

	public async execute({email, username, password}: ICreateUserDTO): Promise<User> {
		const userExists = await this.usersRepository.findByEmail(email);

		if(userExists){
			throw new Error('Account already registered');
		}

		const hashedPassword = await bcrypt.hash(password, 15);

		const user = await this.usersRepository.create({
			email,
			username,
			password: hashedPassword
		});

		return user;
	}
}

export default CreateUserService;
