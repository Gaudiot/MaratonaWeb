import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IUpdateBlogpostDTO from '../dtos/IUpdateBlogpostDTO';
import Blogpost from '../entities/Blogpost';
import IBlogpostRepository from '../repositories/interfaces/IBlogpostRepository';

interface IResponse {
	blogpost: Blogpost
}

@injectable()
class UpdateBlogpostService {
	constructor(
		@inject('BlogpostsRepository')
		private blogpostsRepository: IBlogpostRepository,
	) {}

	public async execute(blogpostData: IUpdateBlogpostDTO): Promise<IResponse>{
		const blogpost = await this.blogpostsRepository.updateById(blogpostData);

		if(!blogpost){
			throw new AppError('Blogpost not found', 404);
		}

		return {blogpost};
	}
}

export default UpdateBlogpostService;