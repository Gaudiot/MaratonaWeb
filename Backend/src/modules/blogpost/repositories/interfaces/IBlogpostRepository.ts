import ICreateBlogpostDTO from '../../dtos/ICreateBlogpostDTO';
import IUpdateBlogpostDTO from '../../dtos/IUpdateBlogpostDTO';

import Blogpost from '../../entities/Blogpost';

interface IBlogpostRepository {
	create(blogpostData: ICreateBlogpostDTO): Promise<Blogpost>;
	retrieveAll(): Promise<Blogpost[]>;
	findById(id: string): Promise<Blogpost | undefined>;
	updateById(blogpostData: IUpdateBlogpostDTO): Promise<Blogpost | undefined>;
	deleteById(id: string): void;
}

export default IBlogpostRepository;