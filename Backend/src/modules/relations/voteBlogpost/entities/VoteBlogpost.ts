import VoteValue from './enums/VoteValues.enum';

import IVoteBlogpost from './interfaces/IVoteBlogpost';

class VoteBlogpost implements IVoteBlogpost {
	id = '';
	user_id = '';
	blogpost_id = '';
	value = VoteValue.neutral;
	created_at = new Date();
	updated_at = new Date();
}

export default VoteBlogpost;