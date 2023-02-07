import { container } from 'tsyringe';

import '../modules/users/providers/';

import IUserRepository from '../modules/users/repositories/interfaces/IUserRepository';
import IMedalRepository from '../modules/medals/repositories/interfaces/IMedalRepository';
import IBlogpostRepository from '../modules/blogpost/repositories/interfaces/IBlogpostRepository';

import FakeUsersRepository from '../modules/users/repositories/FakeUsersRepository';
import FakeMedalsRepository from '../modules/medals/repositories/FakeMedalsRepository';
import FakeBlogpostsRepository from '../modules/blogpost/repositories/FakeBlogpostsRepository';

container.registerSingleton<IUserRepository>(
	'UsersRepository',
	FakeUsersRepository
);

container.registerSingleton<IMedalRepository>(
	'MedalsRepository',
	FakeMedalsRepository
);

container.registerSingleton<IBlogpostRepository>(
	'BlogpostsRepository',
	FakeBlogpostsRepository
);