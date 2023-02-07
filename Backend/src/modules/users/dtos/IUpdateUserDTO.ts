import UserRole from '../entities/enums/UserRole.enum';

interface IUpdateUserDTO {
	id: string;
	username: string;
	email: string;
	role: UserRole;
}

export default IUpdateUserDTO;
