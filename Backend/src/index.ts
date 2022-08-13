import express, {Application, Request, Response} from 'express';
import 'dotenv/config';
import 'dotenv-defaults/config';

const server: Application = express();
const port: number = process.env.PORT;

import router from './routes/routes';

server.get('/', (req: Request, res: Response) => {
	res.json({msg: 'Hello World'});
});

server.use(router);

server.listen(port, () => {
	console.log(`Server up and running on port ${port}`);
});