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

	it('Should return medal', async () => {
		const {id: medal_id} = await fakeMedalsRepository.create({
			contest_date: new Date(),
			contest_name: 'Contest #1',
			medalist_id: '123',
			position: 'gold'
		});

		const medal = await retrieveMedalService.execute({
			medal_id
		});

		expect(medal).toHaveProperty('id');
	});

	it('Should not return non existent medal', async () => {
		await expect(retrieveMedalService.execute({
			medal_id: '123'
		})).rejects.toBeInstanceOf(AppError);
	});
});