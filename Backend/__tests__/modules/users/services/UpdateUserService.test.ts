import UpdateUserService from '../../../../src/modules/users/services/UpdateUserService';
import FakeUsersRepository from '../../../../src/modules/users/repositories/FakeUsersRepository';
import AppError from '../../../../src/shared/errors/AppError';
import UserRole from '../../../../src/modules/users/entities/enums/UserRole.enum';

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

		const updatedUser = await updateUserService.execute({
			id: user.id,
			username: 'mylena',
			email: 'gaudiot@twitch.tv',
			role: UserRole.admin
		});

		expect(updatedUser.username).toBe('mylena');
		expect(updatedUser.email).toBe('gaudiot@twitch.tv');
		expect(updatedUser.password).toBe(user.password);
		expect(updatedUser.role).toBe(UserRole.admin);
	});

	it('should not be able to update user info with invalid id', async () => {
		await expect(updateUserService.execute({
			id: 'invalid_id',
			username: 'mylena',
			email: 'gaudiot@twitch.tv',
			role: UserRole.competitor
		})).rejects.toBeInstanceOf(AppError);
	});
});