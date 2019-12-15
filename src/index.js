const express = require('express');

const userRouter = require('./routes/user');
const noteRouter = require('./routes/note');
require('./db/db');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use(userRouter);
app.use(noteRouter);

app.listen(3000, _ => {
  console.log('Server is up');
});
