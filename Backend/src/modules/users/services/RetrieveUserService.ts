import { inject, injectable } from 'tsyringe';
import User from '../entities/User';
import IUserRepository from '../repositories/interfaces/IUserRepository';

interface IRequest{
	user_id: string;
}

@injectable()
class CreateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUserRepository,
	) {}

	public async execute({ user_id }: IRequest): Promise<User> {
		const user = await this.usersRepository.findById(user_id);

		if(!user){
			throw new Error('User not found');
		}

		return user;
	}
}

export default CreateUserService;
