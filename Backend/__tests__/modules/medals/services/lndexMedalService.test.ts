import IndexMedalService from '../../../../src/modules/medals/services/IndexMedalService';

import FakeMedalsRepository from '../../../../src/modules/medals/repositories/FakeMedalsRepository';
import FakeUsersRepository from '../../../../src/modules/users/repositories/FakeUsersRepository';

import MedalType from '../../../../src/modules/medals/entities/enums/MedalType.enum';

let fakeMedalsRepository: FakeMedalsRepository;
let fakeUsersRepository: FakeUsersRepository;

let indexMedalService: IndexMedalService;

describe('Index medals', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeMedalsRepository = new FakeMedalsRepository();

		indexMedalService = new IndexMedalService(
			fakeMedalsRepository,
			fakeUsersRepository
		);
	});
	it('should return all medals', async () => {
		const user = await fakeUsersRepository.create({
			email: 'gaudiot@twitch.tv',
			password: '123',
			username: 'gaudiot'
		});

		await fakeMedalsRepository.create({
			contest_date: new Date(),
			contest_name: 'Contest #1',
			medalist_id: 'medalist_id',
			position: MedalType.gold
		});
		await fakeMedalsRepository.create({
			contest_date: new Date(),
			contest_name: 'Contest #2',
			medalist_id: user.id,
			position: MedalType.gold
		});
		await fakeMedalsRepository.create({
			contest_date: new Date(),
			contest_name: 'Contest #3',
			medalist_id: user.id,
			position: MedalType.bronze
		});

		const {medals, quantity} = await indexMedalService.execute();

		expect(medals.length).toBe(3);
		expect(quantity.gold).toBe(2);
		expect(quantity.silver).toBe(0);
		expect(quantity.bronze).toBe(1);
	});
});