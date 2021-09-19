const router = require('express').Router();
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

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:id', deleteCard);
router.put('/:id/likes', likeCard);
router.delete('/:id/likes', dislikeCard);

module.exports = router;
