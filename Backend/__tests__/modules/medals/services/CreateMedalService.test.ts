import CreateMedalService from '../../../../src/modules/medals/services/CreateMedalService';

import FakeMedalsRepository from '../../../../src/modules/medals/repositories/FakeMedalsRepository';
import FakeUsersRepository from '../../../../src/modules/users/repositories/FakeUsersRepository';

import IUser from '../../../../src/modules/users/entities/interfaces/IUser';
import AppError from '../../../../src/shared/errors/AppError';

let fakeMedalsRepository: FakeMedalsRepository;
let fakeUsersRepository: FakeUsersRepository;

let createMedalService: CreateMedalService;
let defaultUser: IUser;

describe('Create Medal', () => {
	beforeAll(async () => {
		fakeUsersRepository = new FakeUsersRepository();

		defaultUser = await fakeUsersRepository.create({
			email: 'gaudiot@twitch.tv',
			password: 'password',
			username: 'gaudiot'
		});
	});

	beforeEach(() => {
		fakeMedalsRepository = new FakeMedalsRepository();

		createMedalService = new CreateMedalService(
			fakeMedalsRepository, 
			fakeUsersRepository
		);
	});

	it('should be able to create new medal', async () => {
		const medal = await createMedalService.execute({
			contest_name: 'Contest Teste #1',
			position: 'gold',
			medalist_id: defaultUser.id,
			contest_date: new Date()
		});

		expect(medal).toHaveProperty('id');
	});

	it('should not be able to create medal with unexisting medalist', async () => {
		await expect(createMedalService.execute({
			contest_date: new Date(),
			contest_name: 'Contest Teste #2',
			medalist_id: '123',
			position: 'silver'
		})).rejects.toBeInstanceOf(AppError);
	});
});
