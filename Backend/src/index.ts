import express, {Application, Request, Response} from 'express';

const server: Application = express();
const port = 3000;

server.get('/', (req: Request, res: Response) => {
	res.json({msg: 'Hello World'});
});

server.listen(port, () => {
	console.log(`Server up and running on port ${port}`);
});