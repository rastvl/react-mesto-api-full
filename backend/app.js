require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const { validateLogin, validateRegister } = require('./middlewares/joiValidator');
const NotFoundError = require('./errors/NotFoundError');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors } = require('./middlewares/cors');

const {
  PORT = 3000,
} = process.env;

const app = express();

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// db connect
mongoose.connect('mongodb://localhost:27017/mestodb2');

app.use(cors);

app.use(requestLogger);

// crash test
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateLogin, login);
app.post('/signup', validateRegister, createUser);

app.use(require('./routes/users'));
app.use(require('./routes/cards'));

// 404 Not Found
app.all('*', auth, () => {
  throw new NotFoundError('Стрница не найдена');
});

app.use(errorLogger);

app.use(errors());

app.use(require('./middlewares/defaultError'));

// start server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
