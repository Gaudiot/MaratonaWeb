interface IUser {
	id: string;
	username: string;
	email: string;
	password: string;
	profile_image_url: string;
	role: string;
	created_at: Date;
	updated_at: Date;
}

export default IUser;
