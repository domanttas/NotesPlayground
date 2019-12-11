const express = require('express');

const userRouter = require('./routes/user');
const noteRouter = require('./routes/note');
require('./db/db');

const app = express();

app.use(express.json());

app.use(userRouter);
app.use(noteRouter);

app.listen(3000, _ => {
    console.log('Server is up');
});