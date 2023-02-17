import { inject, injectable } from 'tsyringe';
import { randomUUID } from 'crypto';

import VoteValue from '../entities/enums/VoteValues.enum';
import VoteBlogpost from '../entities/VoteBlogpost';

import IBlogpostRepository from '../../../blogpost/repositories/interfaces/IBlogpostRepository';
import IUserRepository from '../../../users/repositories/interfaces/IUserRepository';
import IUpdateVoteDTO from '../dtos/IUpdateVoteDTO';
import IVoteBlogpostRepository from '../repositories/interfaces/IVoteBlogpostRepository';

import AppError from '../../../../shared/errors/AppError';

@injectable()
class UpdateVoteBlogpostService {
	constructor(
		@inject('VoteBlogpostsRepository')
		private voteBlogpostsRepository: IVoteBlogpostRepository,

		@inject('UsersRepository')
		private usersRepository: IUserRepository,

		@inject('BlogpostsRepository')
		private blogpostsRepository: IBlogpostRepository
	){};

	public async execute(voteData: IUpdateVoteDTO): Promise<VoteBlogpost>{
		const {user_id, blogpost_id, value} = voteData;

		const userExists = await this.usersRepository.findById(user_id);
		const blogpostExists = await this.blogpostsRepository.findById(blogpost_id);

		if(!userExists || !blogpostExists){
			throw new AppError('Non existent user or blogpost', 404);
		}

		const vote = await this.voteBlogpostsRepository.findByUserAndBlogpost({user_id, blogpost_id});

		const id = vote?.id || randomUUID();

		if(!(value in VoteValue)){
			throw new AppError('Not a valid value to vote', 400);
		}

		const newVote = await this.voteBlogpostsRepository.upsert({
			id,
			user_id,
			blogpost_id,
			value
		});

		return newVote;
	}
}

export default UpdateVoteBlogpostService;