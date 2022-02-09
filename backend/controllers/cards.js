const Card = require('../models/card');
const ServerError = require('../errors/ServerError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const handleError = (err, next) => {
  if (err.name === 'CastError') {
    throw new BadRequestError('Произошла ошибка');
  } else next(err);
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => next(new ServerError()));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: req.user,
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданые некорректные данные');
      } else {
        handleError(err, next);
      }
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const cardId = req.params.id;

  Card.findById(cardId)
    .then((card) => {
      if (card) {
        if (!card.owner.equals(req.user._id)) { // (card.owner._id.toString() !== req.user._id)
          throw new ForbiddenError('Карточка не ваша');
        }
        Card.findByIdAndDelete(cardId).then((cardData) => {
          res.send(cardData);
        });
      } else {
        throw new NotFoundError('Карточка не найдена');
      }
    })
    .catch((err) => {
      handleError(err, next);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: {
        likes: userId,
      },
    },
    {
      new: true,
    },
  )
    .then((card) => {
      if (card) res.send(card);
      else {
        throw new NotFoundError('Карточка не найдена');
      }
    })
    .catch((err) => {
      handleError(err, next);
    }).catch(next);
};

const dislikeCard = (req, res, next) => {
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (card) res.send(card);
      else {
        throw new NotFoundError('Карточка не найдена');
      }
    })
    .catch((err) => {
      handleError(err, next);
    }).catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
