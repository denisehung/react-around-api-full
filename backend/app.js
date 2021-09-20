/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { login, createUser } = require('./controllers/users');
const auth = require('./middleware/auth');
const cardRouter = require('./routes/cards');
const userRouter = require('./routes/users');

// listen to port 3000
const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use((req, res, next) => {
  req.user = {
    _id: '612aadcf2d035b8b3dc2cb67',
  };
  next();
});

app.use(helmet());
app.use(express.json());
app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
