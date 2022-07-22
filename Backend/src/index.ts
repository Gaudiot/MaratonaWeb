import express, {Application, Request, Response} from 'express';
import 'dotenv/config';

const server: Application = express();
const port: number = process.env.PORT;

server.get('/', (req: Request, res: Response) => {
	res.json({msg: 'Hello World'});
});

server.listen(port, () => {
	console.log(`Server up and running on port ${port}`);
});