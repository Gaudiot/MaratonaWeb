import CreateBlogpostService from '../../../../src/modules/blogpost/services/CreateBlogpostService';

import FakeBlogpostsRepostory from '../../../../src/modules/blogpost/repositories/FakeBlogpostsRepository';
import FakeUsersRepository from '../../../../src/modules/users/repositories/FakeUsersRepository';

import IUser from '../../../../src/modules/users/entities/interfaces/IUser';
import AppError from '../../../../src/shared/errors/AppError';

let fakeBlogpostsRepostory: FakeBlogpostsRepostory;
let fakeUsersRepository: FakeUsersRepository;

let createBlogpostService: CreateBlogpostService;
let defaultUser: IUser;

describe('Create Blogpost', () => {
	beforeAll(async () => {
		fakeUsersRepository = new FakeUsersRepository();

		defaultUser = await fakeUsersRepository.create({
			email: 'gaudiot@twitch.tv',
			password: 'password',
			username: 'gaudiot'
		});
	});

	beforeEach(() => {
		fakeBlogpostsRepostory = new FakeBlogpostsRepostory();

		createBlogpostService = new CreateBlogpostService(fakeBlogpostsRepostory, fakeUsersRepository);
	});
	it('Should be able to create new blogpost', async () => {
		const blogpost = await createBlogpostService.execute({
			author_id: defaultUser.id,
			title:'Titulo teste',
			content: 'Conteudo teste'
		});

		expect(blogpost).toHaveProperty('id');
	});

	it('Should not be able to create blogpost with unexistent author_id', async () => {
		await expect(createBlogpostService.execute({
			author_id: '123',
			title: 'Titulo invalido',
			content: 'Conteudo invalido'
		})).rejects.toBeInstanceOf(AppError);
	});
});