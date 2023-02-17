import VoteValue from '../entities/enums/VoteValues.enum';

interface IUpdateVoteDTO {
	id?: string;
	user_id: string;
	blogpost_id: string;
	value: VoteValue;
}

export default IUpdateVoteDTO;