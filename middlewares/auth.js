const jwt = require('jsonwebtoken');

// Подключение статусов ошибок:
const UnauthorizedErr = require('../errors/UnauthorizedErr');

const { SECRET_KEY_DEVELOPMENT } = require('../utils/constants');

const { NODE_ENV, SECRET_KEY } = process.env;

// Проверка аутентификации пользователя:
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // Проверяем наличие и формат заголовка для авторизации пользователя:
  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new UnauthorizedErr('Необходима авторизация!');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // Проверка валидности и расшифровка JWT токена:
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? SECRET_KEY : SECRET_KEY_DEVELOPMENT,
    );
  } catch (err) {
    next(new UnauthorizedErr('Необходима авторизация!'));
    return;
  }
  // Присваиваем расшифрованные данные токена в объект запроса
  req.user = payload;

  next();
};
