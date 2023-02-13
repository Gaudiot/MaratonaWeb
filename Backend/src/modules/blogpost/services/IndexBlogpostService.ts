import { inject, injectable } from 'tsyringe';
import Blogpost from '../entities/Blogpost';
import IBlogpostRepository from '../repositories/interfaces/IBlogpostRepository';

interface IResponse {
	blogposts: Blogpost[];
}

@injectable()
class IndexBlogpostService {
	constructor(
		@inject('BlogpostsRepository')
		private blogpostsRepository: IBlogpostRepository,
	) {}

	public async execute(): Promise<IResponse>{
		const blogposts = await this.blogpostsRepository.retrieveAll();

		return {blogposts};
	}
}

export default IndexBlogpostService;