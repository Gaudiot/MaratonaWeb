import { inject, injectable } from 'tsyringe';

import IBlogpostRepository from '../repositories/interfaces/IBlogpostRepository';

import AppError from '../../../shared/errors/AppError';

interface IRequest {
	blogpost_id: string;
}

@injectable()
class DeleteBlogpostService {
	constructor(
		@inject('BlogpostsRepository')
		private blogpostsRepository: IBlogpostRepository,
	) {}

	public async execute({blogpost_id}: IRequest): Promise<void>{
		const blogpost = this.blogpostsRepository.findById(blogpost_id);

		if(!blogpost){
			throw new AppError('Blogpost not found', 404);
		}

		this.blogpostsRepository.deleteById(blogpost_id);
	}
}

export default DeleteBlogpostService;