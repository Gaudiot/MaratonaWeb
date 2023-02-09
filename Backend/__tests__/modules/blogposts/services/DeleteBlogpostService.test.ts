import DeleteBlogpostService from '../../../../src/modules/blogpost/services/DeleteBlogpostService';

import FakeBlogpostsRepostory from '../../../../src/modules/blogpost/repositories/FakeBlogpostsRepository';

import AppError from '../../../../src/shared/errors/AppError';

let fakeBlogpostsRepostory: FakeBlogpostsRepostory;

let deleteBlogpostService: DeleteBlogpostService;

describe('Delete Blogpost', () => {
	beforeEach(() => {
		fakeBlogpostsRepostory = new FakeBlogpostsRepostory();

		deleteBlogpostService = new DeleteBlogpostService(fakeBlogpostsRepostory);
	});

	it('Should be able to delete blogpost', async () => {
		const blogpost = await fakeBlogpostsRepostory.create({
			author_id: '123',
			title: 'Titulo',
			content: 'Conteudo'
		});

		await deleteBlogpostService.execute({
			blogpost_id: blogpost.id
		});

		const blogpostExists = await fakeBlogpostsRepostory.findById(blogpost.id);

		expect(blogpostExists).toBeUndefined();
	});

	it('Should not be able to delete unexistent blogpost', async () => {
		await expect(deleteBlogpostService.execute({
			blogpost_id: '123'
		})).rejects.toBeInstanceOf(AppError);
	});
});