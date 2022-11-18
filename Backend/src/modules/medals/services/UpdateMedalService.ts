import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IUpdateMedalDTO from '../dtos/IUpdateMedalDTO';
import Medal from '../entities/Medal';
import IMedalRepository from '../repositories/interfaces/IMedalRepository';

@injectable()
class UpdateMedalService {
	constructor(
		@inject('MedalsRepository')
		private medalsRepository: IMedalRepository,
	) {}

	public async execute(medalData: IUpdateMedalDTO): Promise<Medal>{
		const medal = await this.medalsRepository.updateById(medalData);

		if(!medal){
			throw new AppError('Medal not found', 404);
		}

		return medal;
	}
}

export default UpdateMedalService;