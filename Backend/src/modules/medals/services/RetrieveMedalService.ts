import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import Medal from '../entities/Medal';
import IMedalRepository from '../repositories/interfaces/IMedalRepository';

interface IRequest {
	id: string;
}

@injectable()
class RetrieveMedalService {
	constructor(
		@inject('MedalsRepository')
		private medalsRepository: IMedalRepository,
	) {}

	public async execute({id}: IRequest): Promise<Medal>{
		const medal = await this.medalsRepository.findById(id);

		if(!medal){
			throw new AppError('Medal not found', 404);
		}

		return medal;
	}
}

export default RetrieveMedalService;