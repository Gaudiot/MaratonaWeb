import { inject, injectable } from 'tsyringe';

import IUserRepository from '../repositories/interfaces/IUserRepository';

interface IRequest {
	user_id: string;
}

@injectable()
class CreateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUserRepository,
	) {}

	public async execute({ user_id }: IRequest): Promise<void> {
		const userExist = await this.usersRepository.findById(user_id);

		if(!userExist){
			throw new Error('User not found');
		}

		this.usersRepository.deleteById(user_id);
	}
}

export default CreateUserService;
