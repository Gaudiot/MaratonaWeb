import IndexBlogpostService from '../../../../src/modules/blogpost/services/IndexBlogpostService';

import FakeBlogpostsRepostory from '../../../../src/modules/blogpost/repositories/FakeBlogpostsRepository';

let fakeBlogpostsRepostory: FakeBlogpostsRepostory;

let indexBlogpostService: IndexBlogpostService;

describe('Retrieve all blogposts', () => {
	beforeEach(() => {
		fakeBlogpostsRepostory = new FakeBlogpostsRepostory();

		indexBlogpostService = new IndexBlogpostService(fakeBlogpostsRepostory);
	});

	it('Should return all blogposts', async () => {
		await fakeBlogpostsRepostory.create({
			author_id: '123',
			title: 'Titulo #1',
			content: 'Conteudo #1'
		});
		await fakeBlogpostsRepostory.create({
			author_id: '123',
			title: 'Titulo #2',
			content: 'Conteudo #2'
		});
		await fakeBlogpostsRepostory.create({
			author_id: '123',
			title: 'Titulo #3',
			content: 'Conteudo #3'
		});
		await fakeBlogpostsRepostory.create({
			author_id: '123',
			title: 'Titulo #4',
			content: 'Conteudo #4'
		});

		const {blogposts} = await indexBlogpostService.execute();

		expect(blogposts.length).toBe(4);
	});
});