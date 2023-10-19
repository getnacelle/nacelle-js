import serverless from 'serverless-http';
import express, { type Express, type Request, type Response } from 'express';
import { indexData } from './src';

const app: Express = express();

app.get('/', async (_req: Request, res: Response) => {
  const message = await indexData();
  res.status(200).json(message);
});

export const handler = serverless(app);
