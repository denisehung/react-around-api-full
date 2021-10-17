const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validateUrl = require('../utils/validateUrl');

const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
}), getCurrentUser);

router.get('/:id', getUserById);

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
