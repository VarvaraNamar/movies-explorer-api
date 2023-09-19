const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Подключение статусов ошибок:
const NotFoundErr = require('../errors/NotFoundErr');
const ConflictErr = require('../errors/ConflictErr');
const BadRequestErr = require('../errors/BadRequestErr');

// Вывод сообщений об ошибках:
const {
  USER_EXISTS_ERROR,
  WRONG_DATA_USER,
  USER_ID_NOT_FOUND,
  WRONG_DATA_PROFILE,
  USER_NOT_FOUND,
} = require('../utils/messegeConstants');

// Подключение статуса об успешной отправке запроса:
const { CREATED_CODE } = require('../errors/ResponseStatus');

// Секретный код для разработки:
const { SECRET_KEY_DEVELOPMENT } = require('../utils/constants');

// Константы для продакшена:
const { NODE_ENV, SECRET_KEY } = process.env;

// Создание нового пользователя:
const produceUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => res.status(CREATED_CODE).send({
      email: user.email,
      name: user.name,
      _id: user._id,
    }))
    .catch((e) => {
      if (e.code === 11000) {
        next(new ConflictErr(USER_EXISTS_ERROR));
      } else if (e.name === 'ValidationError') {
        next(new BadRequestErr(WRONG_DATA_USER));
      } else {
        next(e);
      }
    });
};

// Логирование пользователя:
const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // Создание JWT-токена
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? SECRET_KEY : SECRET_KEY_DEVELOPMENT,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

// Получение данных текущего пользователя:
const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundErr(USER_ID_NOT_FOUND);
    })
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequestErr(USER_NOT_FOUND));
      } else {
        next(e);
      }
    });
};

// Обновление данных пользователя:
const changeUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFoundErr(USER_ID_NOT_FOUND);
    })
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      if (e.code === 11000) {
        next(new ConflictErr(USER_EXISTS_ERROR));
      } else if (e.name === 'ValidationError') {
        next(new BadRequestErr(WRONG_DATA_PROFILE));
      } else {
        next(e);
      }
    });
};

module.exports = {
  loginUser,
  produceUser,
  getCurrentUser,
  changeUserInfo,
};
