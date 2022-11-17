import { inject, injectable } from 'tsyringe';
import MedalType from '../entities/enums/MedalType.enum';
import IMedalRepository from '../repositories/interfaces/IMedalRepository';

interface IResponse {
	gold: number;
	silver: number;
	bronze: number;
	other: number;
}

@injectable()
class CountMedalsService {
	constructor(
		@inject('MedalsRepository')
		private medalsRepository: IMedalRepository,
	) {}

	public async execute(): Promise<IResponse>{
		const gold = await this.medalsRepository.countByMedalType(MedalType.gold);
		const silver = await this.medalsRepository.countByMedalType(MedalType.silver);
		const bronze = await this.medalsRepository.countByMedalType(MedalType.bronze);
		const other = await this.medalsRepository.countByMedalType(MedalType.other);

		return ({
			gold,
			silver,
			bronze,
			other
		});
	}
}

export default CountMedalsService;