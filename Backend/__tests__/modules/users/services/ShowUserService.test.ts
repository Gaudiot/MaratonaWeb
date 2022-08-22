import RetrieveUserService from '../../../../src/modules/users/services/RetrieveUserService';
import FakeUsersRepository from '../../../../src/modules/users/repositories/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;

let retrieveUserService: RetrieveUserService;

describe('Create User', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
        
		retrieveUserService = new RetrieveUserService(
			fakeUsersRepository
		);
	});

	it('should be able to retrieve user info', async () => {
		const user = await fakeUsersRepository.create({
			username: 'gaudiot',
			email: 'gaudiot@twitch.tv',
			password: '12345'
		});

		const user_info = await retrieveUserService.execute({
			user_id: user.id
		});

		expect(user_info.username).toBe('gaudiot');
		expect(user_info.email).toBe('gaudiot@twitch.tv');
	});

	it('should not be able to retrieve user info with invalid id', async () => {
		await expect(retrieveUserService.execute({
			user_id: '123'
		})).rejects.toBeInstanceOf(Error);
	});
});