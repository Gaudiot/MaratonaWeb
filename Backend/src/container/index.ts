import { container } from 'tsyringe';

import FakeUsersRepository from '../modules/users/repositories/FakeUsersRepository';
import IUserRepository from '../modules/users/repositories/interfaces/IUserRepository';

container.registerSingleton<IUserRepository>(
	'UsersRepository',
	FakeUsersRepository
);