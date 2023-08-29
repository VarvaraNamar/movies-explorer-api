// Секретный ключ для разработки и отладки приложения:
const SECRET_KEY_DEVELOPMENT = 'development-secret-key';

const { URL_DB = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

module.exports = {
  SECRET_KEY_DEVELOPMENT,
  URL_DB,
};
