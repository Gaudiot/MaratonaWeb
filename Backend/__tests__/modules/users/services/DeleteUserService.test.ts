import DeleteUserService from '../../../../src/modules/users/services/DeleteUserService';
import FakeUsersRepository from '../../../../src/modules/users/repositories/FakeUsersRepository';
import AppError from '../../../../src/shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;

let deleteUserService: DeleteUserService;

describe('Delete User', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
        
		deleteUserService = new DeleteUserService(
			fakeUsersRepository
		);
	});

	it('should be able to delete user', async () => {
		const user = await fakeUsersRepository.create({
			username: 'gaudiot',
			email: 'gaudiot@twitch.tv',
			password: '12345'
		});

		await deleteUserService.execute({
			user_id: user.id
		});

		const userExist = await fakeUsersRepository.findById(user.id);

		expect(userExist).toBeUndefined();
	});

	it('should not be able to delete user with invalid id', async () => {
		await expect(deleteUserService.execute({
			user_id: 'invalid_id'
		})).rejects.toBeInstanceOf(AppError);
	});
});