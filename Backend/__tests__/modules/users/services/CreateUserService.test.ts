import CreateUserService from '../../../../src/modules/users/services/CreateUserService';

import FakeUsersRepository from '../../../../src/modules/users/repositories/FakeUsersRepository';
import FakeHashProvider from '../../../../src/modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AppError from '../../../../src/shared/errors/AppError';
import UserRole from '../../../../src/modules/users/entities/enums/UserRole.enum';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createUserService: CreateUserService;

describe('Create User', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeHashProvider = new FakeHashProvider();
        
		createUserService = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider
		);
	});

	it('should be able to create new user', async () => {
		const user = await createUserService.execute({
			username: 'maratona',
			email: 'maratona@cin.ufpe.br',
			password: '12345',
		});

		expect(user).toHaveProperty('id');
		expect(user.role).toBe(UserRole.visit);
	});

	it('should not be able to create user with email already registered', async () => {
		await createUserService.execute({
			username: 'maratona',
			email: 'maratona@cin.ufpe.br',
			password: '12345',
		});

		await expect(createUserService.execute({
			username: 'icpc',
			email: 'maratona@cin.ufpe.br',
			password: '54321',
		})).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to create user with username already registered', async () => {
		await createUserService.execute({
			username: 'maratona',
			email: 'maratona@cin.ufpe.br',
			password: '12345',
		});

		await expect(createUserService.execute({
			username: 'maratona',
			email: 'icpc@cin.ufpe.br',
			password: '54321',
		})).rejects.toBeInstanceOf(AppError);
	});
});