// Подключение библиотеки winston:
const winston = require('winston');
// Подключение express-winston, модуля winston:
const expressWinston = require('express-winston');

// Создаём middleware для логирования запросов:
const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: 'request.log' })],
  format: winston.format.json(),
});

// Создание middleware для логирования ошибок:
const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: 'error.log' })],
  format: winston.format.json(),
});

module.exports = {
  errorLogger,
  requestLogger,
};
