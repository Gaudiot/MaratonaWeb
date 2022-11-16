import { inject, injectable } from 'tsyringe';
import Medal from '../entities/Medal';
import IMedalRepository from '../repositories/interfaces/IMedalRepository';

@injectable()
class RetrieveAllMedalsService {
	constructor(
		@inject('MedalsRepository')
		private medalsRepository: IMedalRepository,
	) {}

	public async execute(): Promise<Medal[]>{
		const medals = this.medalsRepository.retrieveAll();

		return medals;
	}
}

export default RetrieveAllMedalsService;