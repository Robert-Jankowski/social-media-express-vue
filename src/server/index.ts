import express, { Express, Request, Response } from 'express';

const app: Express = express()
const port = 3000

app.use(express.static('dist'))

app.get('/api/people', (req: Request, res: Response) => {
  res.send([{name: 'Jan'}, {name: 'Adam'}])
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
