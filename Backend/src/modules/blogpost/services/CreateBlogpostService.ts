import { inject, injectable } from 'tsyringe';

import ICreateBlogpostDTO from '../dtos/ICreateBlogpostDTO';
import IBlogpostRepository from '../repositories/interfaces/IBlogpostRepository';
import IUserRepository from '../../users/repositories/interfaces/IUserRepository';

import AppError from '../../../shared/errors/AppError';
import Blogpost from '../entities/Blogpost';

@injectable()
class CreateBlogpostService {
	constructor(
		@inject('BlogpostsRepository')
		private blogpostsRepository: IBlogpostRepository,

		@inject('UsersRepository')
		private usersRepository: IUserRepository
	){}

	public async execute(createBlogpostDTO: ICreateBlogpostDTO): Promise<Blogpost> {
		const userExists = await this.usersRepository.findById(createBlogpostDTO.author_id);

		if(!userExists){
			throw new AppError('author does not exists', 404);
		}

		const blogpost = this.blogpostsRepository.create(createBlogpostDTO);

		return blogpost;
	}
}

export default CreateBlogpostService;