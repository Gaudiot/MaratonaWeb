import VoteValue from '../entities/enums/VoteValues.enum';

interface IUpsertVoteDTO {
	id: string;
	user_id: string;
	blogpost_id: string;
	value: VoteValue;
}

export default IUpsertVoteDTO;