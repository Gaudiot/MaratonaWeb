import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUserRepository from './interfaces/IUserRepository';

import User from '../entities/User';
import { randomUUID } from 'crypto';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

class FakeUsersRepository implements IUserRepository {
	private users: User[] = [];

	public async create(userData: ICreateUserDTO): Promise<User> {
		const user = new User();

		Object.assign(user, {id: randomUUID()}, userData);

		this.users.push(user);

		return user;
	}

	public async findById(id: string): Promise<User | undefined> {
		return this.users.find((user) => user.id === id);
	}

	public async findByUsername(username: string): Promise<User | undefined> {
		return this.users.find((user) => user.username === username);
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		return this.users.find(user => user.email === email);
	}

	public async updateById(userData: IUpdateUserDTO): Promise<User | undefined> {
		const userId = userData.id;
		const userIndex = this.users.findIndex(user => user.id === userId);

		const user = new User();

		if(userIndex == -1) return;

		Object.assign(user, this.users[userIndex], userData);
		this.users[userIndex] = user;

		return user;
	}

	public deleteById(id: string): void {
		const userIndex = this.users.findIndex(user => user.id === id);

		if(userIndex != -1){
			this.users.splice(userIndex, 1);
		}
	}
}

export default FakeUsersRepository;