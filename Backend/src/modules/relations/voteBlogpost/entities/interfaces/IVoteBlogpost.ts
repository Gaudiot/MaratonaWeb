import VoteValue from '../enums/VoteValues.enum';

interface IVoteBlogpost {
	id: string;
	user_id: string;
	blogpost_id: string;
	value: VoteValue;
	created_at: Date;
	updated_at: Date;
}

export default IVoteBlogpost;