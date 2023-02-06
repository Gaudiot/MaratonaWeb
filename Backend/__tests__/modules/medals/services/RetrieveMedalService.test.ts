import RetrieveMedalService from '../../../../src/modules/medals/services/RetrieveMedalService';

import FakeMedalsRepository from '../../../../src/modules/medals/repositories/FakeMedalsRepository';

import AppError from '../../../../src/shared/errors/AppError';

let fakeMedalsRepository: FakeMedalsRepository;

let retrieveMedalService: RetrieveMedalService;

describe('Retrieve single medal', () => {
	beforeEach(() => {
		fakeMedalsRepository = new FakeMedalsRepository();

		retrieveMedalService = new RetrieveMedalService(
			fakeMedalsRepository
		);
	});

	it('should return medal', async () => {
		const {id: medal_id} = await fakeMedalsRepository.create({
			contest_date: new Date(),
			contest_name: 'Contest #1',
			medalist_id: '123',
			position: 'gold'
		});

		const medal = await retrieveMedalService.execute({
			id: medal_id
		});

		expect(medal).toHaveProperty('id');
	});

	it('should not return non existent medal', async () => {
		await expect(retrieveMedalService.execute({
			id: '123'
		})).rejects.toBeInstanceOf(AppError);
	});
});