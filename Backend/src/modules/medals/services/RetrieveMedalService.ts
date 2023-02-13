import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import Medal from '../entities/Medal';
import IMedalRepository from '../repositories/interfaces/IMedalRepository';

interface IRequest {
	medal_id: string;
}

@injectable()
class RetrieveMedalService {
	constructor(
		@inject('MedalsRepository')
		private medalsRepository: IMedalRepository,
	) {}

	public async execute({medal_id}: IRequest): Promise<Medal>{
		const medal = await this.medalsRepository.findById(medal_id);

		if(!medal){
			throw new AppError('Medal not found', 404);
		}

		return medal;
	}
}

export default RetrieveMedalService;