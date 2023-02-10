import UserRole from './enums/UserRole.enum';
import IUser from './interfaces/IUser';

class User implements IUser {
	id = '';
	username = '';
	email = '';
	password = '';
	profile_image_url =
		'https://www.publicdomainpictures.net/pictures/40000/nahled/red-balloon.jpg';
	role = UserRole.visit;
	created_at = new Date();
	updated_at = new Date();
}

export default User;
