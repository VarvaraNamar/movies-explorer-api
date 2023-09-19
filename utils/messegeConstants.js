// Файл со всеми сообщениями об ошибках, которые есть в проекте.

const WRONG_DATA_MOVIE = 'Переданы некорректные данные при добавлении фильма в избранное';

const MOVIE_ID_NOT_FOUND = 'Фильм с указанным _id не был найден.';

const MOVE_REMUVE_ERROR = 'Невозможно убрать фильм из избранного.';

const WRONG_DATA_MOVIE_REMUVE = 'Переданы некорректные данные при попытке убрать фильм из избранного.';

const USER_EXISTS_ERROR = 'Пользователь с такими данными уже существует.';

const WRONG_DATA_USER = 'При создании пользователя были переданы некорректные данные.';

const USER_ID_NOT_FOUND = 'Пользователь с таким _id не был найден.';

const USER_NOT_FOUND = 'Запрашиваемый пользователь не был найден.';

const WRONG_DATA_PROFILE = 'Переданы некорректные данные при попытки обновления профиля';

const SERVER_ERROR = 'На сервере произошла ошибка. Статус ошибки сервера - 500.';
const LIMITER_ERROR = 'Превышено количество запросов на сервер. Попробуйте повторить запрос позже.';

const WRONG_EMAIL_OR_PASSWORD = 'Неправильные почта или пароль.';

const WRONG_EMAIL = 'Неправильный формат почты. Введите корректный email.';

const WRONG_URL_FORMAT = 'Неправильный формат ссылки. Введите корректный URL.';

const URL_NOT_FOUND = 'Такая страница не найдена.';

const DB_CONNECT = 'Соединение с БД установлено.';

const DB_DISCONNECT = 'Не удалось подключиться к БД.';

module.exports = {
  WRONG_DATA_MOVIE,
  MOVIE_ID_NOT_FOUND,
  MOVE_REMUVE_ERROR,
  WRONG_DATA_MOVIE_REMUVE,
  USER_EXISTS_ERROR,
  WRONG_DATA_USER,
  USER_ID_NOT_FOUND,
  USER_NOT_FOUND,
  WRONG_DATA_PROFILE,
  SERVER_ERROR,
  LIMITER_ERROR,
  WRONG_EMAIL_OR_PASSWORD,
  WRONG_EMAIL,
  WRONG_URL_FORMAT,
  URL_NOT_FOUND,
  DB_CONNECT,
  DB_DISCONNECT,
};
