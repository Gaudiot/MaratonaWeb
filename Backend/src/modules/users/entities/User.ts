import IUser from './interfaces/IUser';

class User implements IUser {
	id = '';
	username = '';
	email = '';
	password = '';
	created_at = new Date();
	updated_at = new Date();
}

export default User;
