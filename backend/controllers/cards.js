const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Invalid data: card cannot be created' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
      } else {
        res.status(404).send({ message: 'Card not found' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid card ID' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
      } else {
        res.status(404).send({ message: 'Card not found' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid card ID' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
      } else {
        res.status(404).send({ message: 'Card not found' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid card ID' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};
