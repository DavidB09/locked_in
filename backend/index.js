const express = require('express');
const dotenv = require('dotenv');
const prisma = require('./db/prisma')

dotenv.config();

const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(port, async () => {
    console.log(`App listening on port ${3000}`);
});

