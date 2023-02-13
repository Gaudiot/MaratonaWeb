import IndexUserService from '../../../../src/modules/users/services/IndexUserService';
import FakeUsersRepository from '../../../../src/modules/users/repositories/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;

let indexUserService: IndexUserService;

describe('Index Users', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
        
		indexUserService = new IndexUserService(
			fakeUsersRepository
		);
	});

	it('Should return all users', async () => {
		await fakeUsersRepository.create({
			username: 'gaudiot1',
			email: 'gaudiot1@twitch.tv',
			password: '12345'
		});
		await fakeUsersRepository.create({
			username: 'gaudiot2',
			email: 'gaudiot2@twitch.tv',
			password: '12345'
		});
		await fakeUsersRepository.create({
			username: 'gaudiot3',
			email: 'gaudiot3@twitch.tv',
			password: '12345'
		});
		await fakeUsersRepository.create({
			username: 'gaudiot4',
			email: 'gaudiot4@twitch.tv',
			password: '12345'
		});

		const users = await indexUserService.execute();

		expect(users.length).toBe(4);
		expect(users[0].email).toBe('gaudiot1@twitch.tv');
	});
});