const express = require('express');

const userRouter = require('./routes/user');
require('./db/db');

const app = express();

app.use(express.json());

app.use(userRouter);

app.listen(3000, _ => {
    console.log('Server is up');
});