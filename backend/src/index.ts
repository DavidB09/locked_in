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

app.get('/users', async (req: express.Request, res: express.Response) => {
    const users = await prisma.user.findMany();

    const names = users.map(u => u.Username);

    res.status(200).send(`The names are ${names.join(', ')}.`);
})

