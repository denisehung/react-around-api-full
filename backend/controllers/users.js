const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Invalid data: user cannot be created' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // we're creating a token
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });

      // we return the token
      res.send({ token });
    })
    .catch(() => {
      res.status(401).send({ message: 'Invalid email or password' });
    });
};

module.exports.getCurrentUser = (req, res) {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User does not exist' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid user ID' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
  };

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User does not exist' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid user ID' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id,
    { name, about },
    { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User does not exist' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid user ID' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id,
    { avatar },
    { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User does not exist' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid user ID' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};
