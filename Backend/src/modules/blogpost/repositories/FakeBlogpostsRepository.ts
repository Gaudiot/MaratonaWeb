import { randomUUID } from 'crypto';

import ICreateBlogpostDTO from '../dtos/ICreateBlogpostDTO';
import IUpdateBlogpostDTO from '../dtos/IUpdateBlogpostDTO';
import IBlogpostRepository from './interfaces/IBlogpostRepository';

import Blogpost from '../entities/Blogpost';

class FakeBlogpostsRepository implements IBlogpostRepository {
	private blogposts: Blogpost[] = [];

	public async create(blogpostData: ICreateBlogpostDTO): Promise<Blogpost> {
		const blogpost = new Blogpost();

		Object.assign(blogpost, {id: randomUUID()}, blogpostData);

		this.blogposts.push(blogpost);

		return blogpost;
	}

	public async retrieveAll(): Promise<Blogpost[]> {
		return this.blogposts;
	}

	public async findById(id: string): Promise<Blogpost | undefined> {
		return this.blogposts.find(blogpost => blogpost.id === id);
	}

	public async updateById(blogpostData: IUpdateBlogpostDTO): Promise<Blogpost | undefined> {
		const blogpostIndex = this.blogposts.findIndex(blogpost => blogpost.id === blogpostData.id);

		if(blogpostIndex == -1){
			return;
		}

		const blogpost = new Blogpost();

		Object.assign(blogpost, this.blogposts[blogpostIndex], blogpostData);
		this.blogposts[blogpostIndex] = blogpost;

		return blogpost;
	}

	public deleteById(id: string): void {
		const blogpostIndex = this.blogposts.findIndex(blogpost => blogpost.id === id);
		
		if(blogpostIndex != -1){
			this.blogposts.splice(blogpostIndex, 1);
		}
	}
}

export default FakeBlogpostsRepository;
