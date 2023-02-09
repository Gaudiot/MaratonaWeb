import UpdateBlogpostService from '../../../../src/modules/blogpost/services/UpdateBlogpostService';

import FakeBlogpostsRepostory from '../../../../src/modules/blogpost/repositories/FakeBlogpostsRepository';

import AppError from '../../../../src/shared/errors/AppError';

let fakeBlogpostsRepostory: FakeBlogpostsRepostory;

let updateBlogpostService: UpdateBlogpostService;

describe('Update blogpost', () => {
	beforeEach(() => {
		fakeBlogpostsRepostory = new FakeBlogpostsRepostory();

		updateBlogpostService = new UpdateBlogpostService(fakeBlogpostsRepostory);
	});

	it('Should be able to update blogpost', async () => {
		const {id: blogpost_id} = await fakeBlogpostsRepostory.create({
			author_id: '123',
			title: 'Titulo #1',
			content: 'Conteudo #1'
		});

		const {blogpost} = await updateBlogpostService.execute({
			id: blogpost_id,
			title: 'Titulo Modificado',
			content: 'Conteudo Modificado'
		});

		expect(blogpost.title).toBe('Titulo Modificado');
		expect(blogpost.content).toBe('Conteudo Modificado');
	});

	it('Should not update non existent blogpost', async () => {
		await expect(updateBlogpostService.execute({
			id: '123',
			title: 'Titulo #2',
			content: 'Conteudo #3'
		})).rejects.toBeInstanceOf(AppError);
	});
});