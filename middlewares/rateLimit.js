const rateLimiter = require('express-rate-limit');

// Вывод сообщений об ошибках:
const { LIMITER_ERROR } = require('../utils/messegeConstants');

// Ограничитель запросов к серверу:
const limiter = rateLimiter({
  max: 160,
  windowMS: 55000,
  message: LIMITER_ERROR,
});

module.exports = limiter;
