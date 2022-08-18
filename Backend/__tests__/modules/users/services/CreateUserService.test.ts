import CreateUserService from '../../../../src/modules/users/services/CreateUserService';
import FakeUsersRepository from '../../../../src/modules/users/repositories/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;

let createUserService: CreateUserService;

describe('Create User', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
        
		createUserService = new CreateUserService(
			fakeUsersRepository
		);
	});

	it('should be able to create new user', async () => {
		const user = await createUserService.execute({
			username: 'gaudiot',
			email: 'gaudiot@twitch.tv',
			password: '12345',
		});

		expect(user).toHaveProperty('id');
	});

	it('should not be able to create user with email already registered', async () => {
		await createUserService.execute({
			username: 'gaudiot',
			email: 'gaudiot@twitch.tv',
			password: '12345',
		});

		await expect(createUserService.execute({
			username: 'morena',
			email: 'gaudiot@twitch.tv',
			password: '54321',
		})).rejects.toBeInstanceOf(Error);
	});
});