const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ServerError = require('../errors/ServerError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const handleError = (err, next) => {
  if (err.name === 'CastError') {
    throw new BadRequestError('Произошла ошибка');
  } else next(err);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => res.send(user))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new BadRequestError(
              'Переданы некорректные данные при создании пользователя',
            );
          }
          if (err.name === 'MongoServerError' && err.code === 11000) {
            throw new ConflictError(`E-mail ${email} уже зарегистрирован`);
          } else next(err);
        })
        .catch((err) => handleError(err, next));
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      throw new ServerError();
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  const { id } = req.params;
  // console.log(req.params)
  User.findById(id)
    .then((user) => {
      if (user) res.send(user);
      else {
        throw new NotFoundError('Пользователя с данным id не существует');
      }
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  // console.log(req.user);
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) res.send(user);
      else {
        throw new NotFoundError('Пользователя с данным id не существует');
      }
    })
    .catch((err) => handleError(err, next))
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  // const { userId } = req.params;
  const { avatar } = req.body;
  console.log(avatar);
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) res.send(user);
      else {
        throw new NotFoundError('Пользователя с данным id не существует');
      }
    })
    .catch((err) => handleError(err))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const { NODE_ENV, JWT_SECRET } = process.env;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      req.user = {
        userId: user._id.toString(),
      };
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        {
          expiresIn: '7d',
        },
      );
      req.headers.authorization = `Bearer ${token}`;
      res.send({ token });
    })
    .catch((err) => {
      if (err.message === 'Неправильные почта или пароль') {
        throw new UnauthorizedError(err.message);
      } else throw err;
    })
    .catch(next);
};

const getCurrentProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => handleError(err, next))
    .catch(next);
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  login,
  getCurrentProfile,
};
