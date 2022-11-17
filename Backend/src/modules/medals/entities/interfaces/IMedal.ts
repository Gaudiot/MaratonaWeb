import MedalType from '../enums/MedalType.enum';

interface IMedal {
	id: string;
	position: MedalType;
	contest_name: string;
	contest_date: Date;
	medalist_id: string;
	created_at: Date;
	updated_at: Date;
}

export default IMedal;
