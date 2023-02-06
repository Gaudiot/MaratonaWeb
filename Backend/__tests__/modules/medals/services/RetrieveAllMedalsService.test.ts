import RetrieveAllMedalsService from '../../../../src/modules/medals/services/RetrieveAllMedalsService';

import FakeMedalsRepository from '../../../../src/modules/medals/repositories/FakeMedalsRepository';

let fakeMedalsRepository: FakeMedalsRepository;

let retrieveAllMedalsService: RetrieveAllMedalsService;

describe('Retrieve all medals', () => {
	beforeEach(() => {
		fakeMedalsRepository = new FakeMedalsRepository();

		retrieveAllMedalsService = new RetrieveAllMedalsService(
			fakeMedalsRepository
		);
	});
	it('should return all medals', async () => {
		fakeMedalsRepository.create({
			contest_date: new Date(),
			contest_name: 'Contest #1',
			medalist_id: '123',
			position: 'gold'
		});
		fakeMedalsRepository.create({
			contest_date: new Date(),
			contest_name: 'Contest #2',
			medalist_id: '123',
			position: 'gold'
		});
		fakeMedalsRepository.create({
			contest_date: new Date(),
			contest_name: 'Contest #3',
			medalist_id: '123',
			position: 'bronze'
		});

		const medals = await retrieveAllMedalsService.execute();

		expect(medals.length).toBe(3);
	});
});