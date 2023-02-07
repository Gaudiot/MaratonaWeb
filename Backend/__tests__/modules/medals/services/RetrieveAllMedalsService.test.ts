import RetrieveAllMedalsService from '../../../../src/modules/medals/services/RetrieveAllMedalsService';

import FakeMedalsRepository from '../../../../src/modules/medals/repositories/FakeMedalsRepository';
import MedalType from '../../../../src/modules/medals/entities/enums/MedalType.enum';

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
			position: MedalType.gold
		});
		fakeMedalsRepository.create({
			contest_date: new Date(),
			contest_name: 'Contest #2',
			medalist_id: '123',
			position: MedalType.gold
		});
		fakeMedalsRepository.create({
			contest_date: new Date(),
			contest_name: 'Contest #3',
			medalist_id: '123',
			position: MedalType.bronze
		});

		const {medals, quantity} = await retrieveAllMedalsService.execute();

		expect(medals.length).toBe(3);
		expect(quantity.gold).toBe(2);
		expect(quantity.silver).toBe(0);
		expect(quantity.bronze).toBe(1);
	});
});