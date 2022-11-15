import 'reflect-metadata';

import 'dotenv/config';
import 'dotenv-defaults/config';
import 'express-async-errors';

import './container';

import AppError from './shared/errors/AppError';

import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';

const server: Application = express();
const port: number = process.env.PORT;

import router from './routes/routes';

server.use(cors());
server.use(express.json());
server.use(router);

server.use((err: Error, request: Request, response: Response, _: NextFunction) => {
	if(err instanceof AppError){
		return response.status(err.statusCode).json({
			status: 'errors',
			message: err.message
		});
	}
		
	console.log(err);

	return response.status(500).json({
		status: 'error',
		message: 'Internal server error',
	});
});

server.listen(port, () => {
	console.log(`Server up and running on port ${port}`);
});