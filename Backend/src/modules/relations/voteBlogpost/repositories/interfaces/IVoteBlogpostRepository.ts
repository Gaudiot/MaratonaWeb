import VoteBlogpost from '../../entities/VoteBlogpost';

import ICreateVoteDTO from '../../dtos/ICreateVoteDTO';
import IFindByUserAndBlogpostDTO from '../../dtos/IFindByUserAndBlogpostDTO';
import IUpdateVoteDTO from '../../dtos/IUpdateVoteDTO';
import IUpsertVoteDTO from '../../dtos/IUpsertVoteDTO';

interface IVoteBlogpostRepository {
	upsert(voteData: IUpsertVoteDTO): Promise<VoteBlogpost>;
	create(voteData: ICreateVoteDTO): Promise<VoteBlogpost>;
	findById(id: string): Promise<VoteBlogpost | undefined>;
	findByUserAndBlogpost(voteData: IFindByUserAndBlogpostDTO): Promise<VoteBlogpost | undefined>;
	retrieveAll(): Promise<VoteBlogpost[]>;
	updateById(voteData: IUpdateVoteDTO): Promise<VoteBlogpost | undefined>;
	deleteById(id: string): void;
}

export default IVoteBlogpostRepository;