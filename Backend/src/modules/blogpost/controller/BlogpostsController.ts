import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateBlogpostService from '../services/CreateBlogpostService';
import DeleteBlogpostService from '../services/DeleteBlogpostService';
import IndexBlogpostService from '../services/IndexBlogpostService';
import RetrieveBlogpostService from '../services/RetrieveBlogpostService';
import UpdateBlogpostService from '../services/UpdateBlogpostService';

class BlogpostsController{
	public async index(req: Request, res: Response): Promise<Response>{
		const indexBlogpostService = container.resolve(IndexBlogpostService);

		const allBlogposts = await indexBlogpostService.execute();

		return res.json(allBlogposts);
	}

	public async retrieve(req: Request, res: Response): Promise<Response>{
		const { id: blogpost_id } = req.params;

		const retrieveBlogpostService = container.resolve(RetrieveBlogpostService);

		const blogpost = await retrieveBlogpostService.execute({
			blogpost_id
		});

		return res.json(blogpost);
	}

	public async create(req: Request, res: Response): Promise<Response>{
		const createBlogpostService = container.resolve(CreateBlogpostService);

		const blogpost = await createBlogpostService.execute(req.body);

		return res.json(blogpost);
	}

	public async update(req: Request, res: Response): Promise<Response>{
		const { id } = req.params;
		const updateBlogpostService = container.resolve(UpdateBlogpostService);

		const blogpost = await updateBlogpostService.execute({id, ...req.body});

		return res.json(blogpost);
	}

	public async delete(req: Request, res: Response): Promise<Response>{
		const { id } = req.params;
		const deleteBlogpostService = container.resolve(DeleteBlogpostService);

		await deleteBlogpostService.execute({blogpost_id: id});

		return res.sendStatus(204);
	}
}

export default BlogpostsController;