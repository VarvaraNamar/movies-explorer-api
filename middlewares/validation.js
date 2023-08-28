// Подключение модуля celebrate из пакета celebrate для валидации запросов:
const { Joi, celebrate } = require('celebrate');

// Подключение регулярного выражения:
const urlRegPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

// Валидатор для проверки данных при создании нового пользователя:
const produceUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
});

// Валидатор для проверки данных при обновлении информации пользователя:
const changeUserInfoValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email({ tlds: { allow: false } }),
  }),
});

// Валидатор для проверки данных при входе пользователя в систему:
const loginUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
});

// Валидатор для проверки данных при сохранении нового фильма:
const addFavoriteMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(urlRegPattern),
    trailerLink: Joi.string().required().regex(urlRegPattern),
    thumbnail: Joi.string().required().regex(urlRegPattern),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

// Валидатор для проверки данных при попытке убрать фильм из сохранённых:
const removeFavoriteMovieValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});

// Экспорт констант валидаторов для дальнейшего использования:
module.exports = {
  loginUserValidator,
  changeUserInfoValidator,
  produceUserValidator,
  addFavoriteMovieValidator,
  removeFavoriteMovieValidator,
};
