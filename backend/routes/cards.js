const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

/* router.get('/', (req, res) => {
  const dataPath = path.join(__dirname, '../data/cards.json');
  fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      res.status(500).send({ message: 'Internal server error' });
      return;
    }
    const cards = JSON.parse(data);
    res.send(cards);
  });
}); */

function validateUrl(string) {
  return validator.isURL(string);
}

router.get('/', getCards);

router.post('/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateUrl),
    }),
  }), createCard);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
}), deleteCard);

router.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
}), likeCard);

router.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
}), dislikeCard);

module.exports = router;
