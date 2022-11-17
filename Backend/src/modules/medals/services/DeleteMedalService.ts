import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IMedalRepository from '../repositories/interfaces/IMedalRepository';

interface IRequest {
	medal_id: string;
}

@injectable()
class DeleteMedalService {
	constructor(
		@inject('MedalsRepository')
		private medalsRepository: IMedalRepository,
	) {}

	public async execute({ medal_id }: IRequest): Promise<void> {
		const medal = await this.medalsRepository.findById(medal_id);

		if(!medal){
			throw new AppError('Medal not found', 404);
		}

		this.medalsRepository.deleteById(medal_id);
	}
}

export default DeleteMedalService;