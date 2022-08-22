import UpdateUserService from '../../../../src/modules/users/services/UpdateUserService';
import FakeUsersRepository from '../../../../src/modules/users/repositories/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;

let updateUserService: UpdateUserService;

describe('Update User', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
        
		updateUserService = new UpdateUserService(
			fakeUsersRepository
		);
	});

	it('should be able to update user info', async () => {
		const user = await fakeUsersRepository.create({
			username: 'gaudiot',
			email: 'gaudiot@twitch.tv',
			password: '12345'
		});

		const user_info = await updateUserService.execute({
			id: user.id,
			username: 'mylena',
			email: 'gaudiot@twitch.tv'
		});

		expect(user_info.username).toBe('mylena');
		expect(user_info.email).toBe('gaudiot@twitch.tv');
		expect(user_info.password).toBe(user.password);
	});

	it('should not be able to update user info with invalid id', async () => {
		await expect(updateUserService.execute({
			id: 'invalid_id',
			username: 'mylena',
			email: 'gaudiot@twitch.tv'
		})).rejects.toBeInstanceOf(Error);
	});
});