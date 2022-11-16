import { inject, injectable } from 'tsyringe';
import ICreateMedalDTO from '../dtos/ICreateMedalDTO';
import Medal from '../entities/Medal';
import IMedalRepository from '../repositories/interfaces/IMedalRepository';

@injectable()
class CreateMedalService {
	constructor(
		@inject('MedalsRepository')
		private medalsRepository: IMedalRepository,
	) {}

	public async execute(createMedalDTO: ICreateMedalDTO): Promise<Medal>{
		const medal = this.medalsRepository.create(createMedalDTO);

		return medal;
	}
}

export default CreateMedalService;