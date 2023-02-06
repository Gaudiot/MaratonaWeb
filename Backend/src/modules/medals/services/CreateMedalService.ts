import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IUserRepository from '../../users/repositories/interfaces/IUserRepository';
import ICreateMedalDTO from '../dtos/ICreateMedalDTO';
import Medal from '../entities/Medal';
import IMedalRepository from '../repositories/interfaces/IMedalRepository';

@injectable()
class CreateMedalService {
	constructor(
		@inject('MedalsRepository')
		private medalsRepository: IMedalRepository,

		@inject('UsersRepository')
		private usersRepository: IUserRepository,
	) {}

	public async execute(createMedalDTO: ICreateMedalDTO): Promise<Medal>{
		const userExists = await this.usersRepository.findById(createMedalDTO.medalist_id);

		if(!userExists){
			throw new AppError('contestant does not exists', 404);
		}

		const medal = this.medalsRepository.create(createMedalDTO);

		return medal;
	}
}

export default CreateMedalService;