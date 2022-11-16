interface IUser {
	id: string;
	username: string;
	email: string;
	password: string;
	profileImageUrl: string;
	created_at: Date;
	updated_at: Date;
}

export default IUser;
