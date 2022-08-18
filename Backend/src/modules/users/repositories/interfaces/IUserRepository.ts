import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../../dtos/IUpdateUserDTO';
import User from '../../entities/User';

interface IUserRepository {
	create(userData: ICreateUserDTO): Promise<User>;
	findById(id: string): Promise<User | undefined>;
	findByEmail(email: string): Promise<User | undefined>;
	updateById(userData: IUpdateUserDTO): Promise<User | undefined>;
	deleteById(id: string): void;
}

export default IUserRepository;