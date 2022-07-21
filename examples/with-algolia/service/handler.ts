import serverless from 'serverless-http'
import express, { Express, Request, Response } from 'express'
import { indexData } from './src'

const app: Express = express()

app.get('/', async (req: Request, res: Response) => {
  const message = await indexData()
  return res.status(200).json(message)
})

export const handler = serverless(app)
