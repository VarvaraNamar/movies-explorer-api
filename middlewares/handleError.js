// Вывод сообщений об ошибках:
const { SERVER_ERROR } = require('../utils/messegeConstants');

// Middleware для обработки ошибок:
const handleError = (err, _, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? SERVER_ERROR : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = handleError;
