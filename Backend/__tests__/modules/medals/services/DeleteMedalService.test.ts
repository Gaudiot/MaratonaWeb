import DeleteMedalService from '../../../../src/modules/medals/services/DeleteMedalService';

import FakeMedalsRepository from '../../../../src/modules/medals/repositories/FakeMedalsRepository';

import AppError from '../../../../src/shared/errors/AppError';

let fakeMedalsRepository: FakeMedalsRepository;

let deleteMedalService: DeleteMedalService;

describe('Delete Medal', () => {
	beforeEach(() => {
		fakeMedalsRepository = new FakeMedalsRepository();

		deleteMedalService = new DeleteMedalService(
			fakeMedalsRepository
		);
	});

	it('Should delete medal', async () => {
		const medal = await fakeMedalsRepository.create({
			contest_date: new Date(),
			contest_name: 'Contest #1',
			medalist_id: '123',
			position: 'gold'
		});

		await deleteMedalService.execute({
			medal_id: medal.id
		});

		const medalExists = await fakeMedalsRepository.findById(medal.id);

		expect(medalExists).toBeUndefined();		
	});

	it('Should not be able to delete unexisting medal', async () => {
		await expect(deleteMedalService.execute({
			medal_id: '123'
		})).rejects.toBeInstanceOf(AppError);
	});
});