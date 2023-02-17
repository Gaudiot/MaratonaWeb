import { randomUUID } from 'crypto';

import VoteBlogpost from '../entities/VoteBlogpost';

import ICreateVoteDTO from '../dtos/ICreateVoteDTO';
import IFindByUserAndBlogpostDTO from '../dtos/IFindByUserAndBlogpostDTO';
import IUpdateVoteDTO from '../dtos/IUpdateVoteDTO';
import IUpsertVoteDTO from '../dtos/IUpsertVoteDTO';
import IVoteBlogpostRepository from './interfaces/IVoteBlogpostRepository';

class FakeVoteBlogpostRepository implements IVoteBlogpostRepository {
	private voteBlogposts: VoteBlogpost[] = [];

	public async upsert(voteData: IUpsertVoteDTO): Promise<VoteBlogpost> {
		const {id, user_id, blogpost_id, value} = voteData;

		const voteIndex = this.voteBlogposts.findIndex((vote) => vote.id === id);

		if(voteIndex === -1){
			return await this.create({
				id,
				user_id,
				blogpost_id,
				value
			});
		}
		Object.assign(this.voteBlogposts[voteIndex], {value});

		return this.voteBlogposts[voteIndex];
	}

	public async create(voteData: ICreateVoteDTO): Promise<VoteBlogpost> {
		const vote = new VoteBlogpost();

		Object.assign(vote, {id: randomUUID()}, voteData);

		this.voteBlogposts.push(vote);

		return vote;
	}

	public async findById(id: string): Promise<VoteBlogpost | undefined> {
		return this.voteBlogposts.find((vote) => vote.id === id);
	}
	
	public async findByUserAndBlogpost(voteData: IFindByUserAndBlogpostDTO): Promise<VoteBlogpost | undefined> {
		const {user_id, blogpost_id} = voteData;

		return this.voteBlogposts.find((vote) => (vote.blogpost_id === blogpost_id && vote.user_id === user_id));
	}

	public async updateById(voteData: IUpdateVoteDTO): Promise<VoteBlogpost | undefined> {
		const {id, value} = voteData;

		const voteIndex = this.voteBlogposts.findIndex((vote) => vote.id === id);

		if(voteIndex === -1) return;

		Object.assign(this.voteBlogposts[voteIndex], {value});

		return this.voteBlogposts[voteIndex];
	}

	public async retrieveAll(): Promise<VoteBlogpost[]> {
		return this.voteBlogposts;
	}
	
	public deleteById(id: string): void {
		const voteIndex = this.voteBlogposts.findIndex((vote) => vote.id === id);

		if(voteIndex != -1){
			this.voteBlogposts.splice(voteIndex, 1);
		}
	}
}

export default FakeVoteBlogpostRepository;