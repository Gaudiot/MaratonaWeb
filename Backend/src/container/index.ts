import { container } from 'tsyringe';

import '../modules/users/providers/';

import IUserRepository from '../modules/users/repositories/interfaces/IUserRepository';
import IMedalRepository from '../modules/medals/repositories/interfaces/IMedalRepository';

import FakeUsersRepository from '../modules/users/repositories/FakeUsersRepository';
import FakeMedalsRepository from '../modules/medals/repositories/FakeMedalsRepository';

container.registerSingleton<IUserRepository>(
	'UsersRepository',
	FakeUsersRepository
);

container.registerSingleton<IMedalRepository>(
	'MedalsRepository',
	FakeMedalsRepository
);