import express from 'express';
import prisma from './prisma';

const dotenv = require('dotenv');
dotenv.config();

const app: express.Application = express();
const port = 3000;

app.listen(port, async () => {
    console.log(`App listening on port ${port}`);
});

// Homepage
app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send("Hello World!");
});

