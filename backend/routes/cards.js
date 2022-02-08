const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { validateId, validateCard } = require('../middlewares/joiValidator');

router.get('/cards', auth, getCards);
router.delete('/cards/:id', validateId, auth, deleteCard);
router.post('/cards', validateCard, auth, createCard);
router.put('/cards/:id/likes', validateId, auth, likeCard);
router.delete('/cards/:id/likes', validateId, auth, dislikeCard);

module.exports = router;
