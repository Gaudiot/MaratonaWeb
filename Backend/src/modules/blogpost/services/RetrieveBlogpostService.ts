import { inject, injectable } from 'tsyringe';

import IBlogpostRepository from '../repositories/interfaces/IBlogpostRepository';

import Blogpost from '../entities/Blogpost';
import AppError from '../../../shared/errors/AppError';

interface IRequest{
	blogpost_id: string;
}

@injectable()
class RetrieveBlogpostService {
	constructor(
		@inject('BlogpostsRepository')
		private blogpostsRepository: IBlogpostRepository
	){}

	public async execute({blogpost_id}: IRequest): Promise<Blogpost> {
		const blogpost = await this.blogpostsRepository.findById(blogpost_id);

		if(!blogpost){
			throw new AppError('Blogpost not found', 404);
		}

		return blogpost;
	}
}

export default RetrieveBlogpostService;