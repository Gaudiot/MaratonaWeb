import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import User from '../entities/User';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserRepository from '../repositories/interfaces/IUserRepository';

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: User;
	token: string;
}

@injectable()
class AuthUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUserRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider
	) {}

	public async execute({email, password}: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findByEmail(email);

		if(!user){
			throw new AppError('Email/password is incorrect.', 401);
		}

		const passwordMatch = await this.hashProvider.compareHash(password, user.password);

		if(!passwordMatch){
			throw new AppError('Email/password is incorrect.', 401);
		}
		
		const token = sign({user}, process.env.JWT_SECRET || 'default');

		return {
			user,
			token
		};
	}
}

export default AuthUserService;
