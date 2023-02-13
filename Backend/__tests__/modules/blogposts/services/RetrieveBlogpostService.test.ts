import RetrieveBlogpostService from '../../../../src/modules/blogpost/services/RetrieveBlogpostService';

import FakeBlogpostsRepostory from '../../../../src/modules/blogpost/repositories/FakeBlogpostsRepository';

import AppError from '../../../../src/shared/errors/AppError';

let fakeBlogpostsRepostory: FakeBlogpostsRepostory;

let retrieveBlogpostService: RetrieveBlogpostService;

describe('Retrieve single blogposts', () => {
	beforeEach(() => {
		fakeBlogpostsRepostory = new FakeBlogpostsRepostory();

		retrieveBlogpostService = new RetrieveBlogpostService(fakeBlogpostsRepostory);
	});

	it('Should return blogposts', async () => {
		const {id: blogpost_id} = await fakeBlogpostsRepostory.create({
			author_id: '123',
			title: 'Titulo #1',
			content: 'Conteudo #1'
		});

		const blogpost = await retrieveBlogpostService.execute({
			blogpost_id
		});

		expect(blogpost).toHaveProperty('id');
	});

	it('Should not return non existent blogpost', async () => {
		await expect(retrieveBlogpostService.execute({
			blogpost_id: '123'
		})).rejects.toBeInstanceOf(AppError);
	});
});