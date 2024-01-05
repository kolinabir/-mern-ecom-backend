import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes'
import globalErrorHandler from './app/middleWares/globalErrorHandler'
const app: Application = express()

app.use(express.json())
app.use(cors())

app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})
app.use(globalErrorHandler)

export default app
