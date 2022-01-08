/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { login, createUser } = require('./controllers/users');
const auth = require('./middleware/auth');
const cardRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const NotFoundError = require('./errors/not-found-err');
const validateUrl = require('./utils/validateUrl');
require('dotenv').config();

// listen to port 3000
const { PORT = 3000 } = process.env;
const app = express();

// mongoose.connect('mongodb://localhost:27017/aroundb');

mongoose.connect('MONGO_URL');

app.use(cors());
app.options('*', cors()); // enable requests for all routes
app.use(helmet());
app.use(express.json());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.get('*', () => {
  throw new NotFoundError('Requested resource not found');
});

app.use(errorLogger); // enabling the error logger

app.use(errors()); // celebrate error handler

app.use((err, req, res, next) => {
  // if an error has no status, display 500
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // check the status and display a message based on it
      message: statusCode === 500
        ? 'An error occurred on the server'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
