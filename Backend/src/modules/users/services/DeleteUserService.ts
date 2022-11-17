import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IUserRepository from '../repositories/interfaces/IUserRepository';

interface IRequest {
	user_id: string;
}

@injectable()
class DeleteUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUserRepository,
	) {}

	public async execute({ user_id }: IRequest): Promise<void> {
		const user = await this.usersRepository.findById(user_id);

		if(!user){
			throw new AppError('User not found', 404);
		}

		this.usersRepository.deleteById(user_id);
	}
}

export default DeleteUserService;
