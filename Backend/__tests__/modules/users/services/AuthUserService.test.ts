import AuthUserService from '../../../../src/modules/users/services/AuthUserService';

import FakeUsersRepository from '../../../../src/modules/users/repositories/FakeUsersRepository';
import FakeHashProvider from '../../../../src/modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let authUserService: AuthUserService;

describe('Create User', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeHashProvider = new FakeHashProvider();
		
		authUserService = new AuthUserService(
			fakeUsersRepository,
			fakeHashProvider
		);
	});

	it('should be able to authenticate', async () => {
		const user = await fakeUsersRepository.create({
			email: 'maratona@cin.ufpe.br',
			username: 'maratona',
			password: '12345'
		});

		const response = await authUserService.execute({
			email: 'maratona@cin.ufpe.br',
			password: '12345'
		});

		expect(response).toHaveProperty('token');
		expect(response.user).toEqual(user);
	});
});