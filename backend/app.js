/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const auth = require('./middleware/auth');
const cardRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const NotFoundError = require('./errors/not-found-err');

// listen to port 3000
const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

/* app.use((req, res, next) => {
  req.user = {
    _id: '612aadcf2d035b8b3dc2cb67',
  };
  next();
}); */

app.use(helmet());
app.use(express.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);

app.get('*', () => {
  throw new NotFoundError('Requested resource not found');
});

app.use((err, req, res, next) => {
  // if an error has no status, display 500
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
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
