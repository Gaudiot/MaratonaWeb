import { inject, injectable } from 'tsyringe';

import IMedalRepository from '../repositories/interfaces/IMedalRepository';
import MedalType from '../entities/enums/MedalType.enum';
import Medal from '../entities/Medal';

interface IResponse {
	medals: Medal[],
	quantity: {
		total: number,
		gold: number,
		silver: number,
		bronze: number
	}
}

@injectable()
class RetrieveAllMedalsService {
	constructor(
		@inject('MedalsRepository')
		private medalsRepository: IMedalRepository,
	) {}

	public async execute(): Promise<IResponse>{
		const medals = await this.medalsRepository.retrieveAll();

		const quantity = {
			total: await this.medalsRepository.count(),
			gold: await this.medalsRepository.countByMedalType(MedalType.gold),
			silver: await this.medalsRepository.countByMedalType(MedalType.silver),
			bronze: await this.medalsRepository.countByMedalType(MedalType.bronze),
			other: await this.medalsRepository.countByMedalType(MedalType.other)
		};

		return {
			medals,
			quantity
		};
	}
}

export default RetrieveAllMedalsService;