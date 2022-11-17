import MedalType from './enums/MedalType.enum';
import IMedal from './interfaces/IMedal';

class Medal implements IMedal {
	id = '';
	position = MedalType.other;
	contest_name = '';
	contest_date = new Date();
	medalist_id = '';
	created_at = new Date();
	updated_at = new Date();
}

export default Medal;
