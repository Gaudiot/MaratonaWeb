import UserRole from './enums/UserRole.enum';
import IUser from './interfaces/IUser';

class User implements IUser {
	id = '';
	username = '';
	email = '';
	password = '';
	profileImageUrl =
		'C:Users\victoDesktopMaratonaWebBackendsrcImagesdefaultProfileImage.jpg';
	role = UserRole.visit;
	created_at = new Date();
	updated_at = new Date();
}

export default User;
