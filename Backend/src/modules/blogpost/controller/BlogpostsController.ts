import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateBlogpostService from '../services/CreateBlogpostService';
import DeleteBlogpostService from '../services/DeleteBlogpostService';
import RetrieveAllBlogpostService from '../services/RetrieveAllBlogpostService';
import UpdateBlogpostService from '../services/UpdateBlogpostService';

class BlogpostsController{
	public async retrieveAll(req: Request, res: Response): Promise<Response>{
		const retrieveAllBlogpostService = container.resolve(RetrieveAllBlogpostService);

		const allBlogposts = await retrieveAllBlogpostService.execute();

		return res.json(allBlogposts);
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