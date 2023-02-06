import UpdateMedalService from '../../../../src/modules/medals/services/UpdateMedalService';

import FakeMedalsRepository from '../../../../src/modules/medals/repositories/FakeMedalsRepository';

import AppError from '../../../../src/shared/errors/AppError';

let fakeMedalsRepository: FakeMedalsRepository;

let updateMedalService: UpdateMedalService;

describe('Update Medal', () => {
	beforeEach(() => {
		fakeMedalsRepository = new FakeMedalsRepository();

		updateMedalService = new UpdateMedalService(fakeMedalsRepository);
	});
	it('should update medal', async () => {
		const {id: medal_id} = await fakeMedalsRepository.create({
			contest_date: new Date(),
			contest_name: 'Contest #1',
			medalist_id: '123',
			position: 'gold'
		});

		const medal = await updateMedalService.execute({
			id: medal_id,
			contest_date: new Date(),
			contest_name: 'Contest #2',
			medalist_id: '123',
			position: 'silver'
		});

		expect(medal.position).toBe('silver');
		expect(medal.contest_name).toBe('Contest #2');
	});

	it('Should not update non existent medal', async () => {
		await expect(updateMedalService.execute({
			id: '321',
			contest_date: new Date(),
			contest_name: 'Contest #2',
			medalist_id: '123',
			position: 'silver'
		})).rejects.toBeInstanceOf(AppError);
	});
});