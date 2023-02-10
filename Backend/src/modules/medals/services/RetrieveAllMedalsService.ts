import { inject, injectable } from 'tsyringe';

import IMedalRepository from '../repositories/interfaces/IMedalRepository';
import MedalType from '../entities/enums/MedalType.enum';
import Medal from '../entities/Medal';
import IUserRepository from '../../users/repositories/interfaces/IUserRepository';

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

		@inject('UsersRepository')
		private usersRepository: IUserRepository
	) {}

	public async execute(): Promise<IResponse>{
		let medals = await this.medalsRepository.retrieveAll();

		medals = await Promise.all(medals.map(async (medal) => {
			const user = await this.usersRepository.findById(medal.medalist_id);

			if(!user) return medal;
			const {profile_image_url} = user;
			Object.assign(medal, {profile_image_url});

			return medal;
		}));

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