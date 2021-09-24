const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

// const fs = require('fs');
// const path = require('path');

/* router.get('/', (req, res) => {
  const dataPath = path.join(__dirname, '../data/users.json');
  fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      res.status(500).send({ message: 'Internal server error' });
      return;
    }
    const users = JSON.parse(data);
    res.send(users);
  });
});

router.get('/:id', (req, res) => {
  const dataPath = path.join(__dirname, '../data/users.json');
  fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      res.status(500).send({ message: 'Internal server error' });
      return;
    }
    const users = JSON.parse(data);
    // Check if requested id exists in JSON list
    const user = users.find((item) => item._id === req.params.id);
    // If id is found, return JSON of corresponding user
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User ID not found' });
    }
  });
}); */

function validateUrl(string) {
  return validator.isURL(string);
}

router.get('/', getUsers);
router.get('/:id', getUserById);
router.get('/me', getCurrentUser);
// router.post('/', createUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateUrl),
  }),
}), updateAvatar);

module.exports = router;
