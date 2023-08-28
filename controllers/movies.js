const Movie = require('../models/movie');

// Подключение статусов ошибок для их дальнейшей обработки:
const NotFoundErr = require('../errors/NotFoundErr');
const ForbiddenErr = require('../errors/ForbiddenErr');
const BadRequestErr = require('../errors/BadRequestErr');

// Вывод сообщений об ошибках:
const {
  WRONG_DATA_MOVIE,
  MOVIE_ID_NOT_FOUND,
  MOVE_REMUVE_ERROR,
  WRONG_DATA_MOVIE_REMUVE,
} = require('../utils/messegeConstants');

// Получение пользовательского массива с фильмами с помощью функции getMovies:
const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

// Функция addFavoriteMovie добавляет фильм в "избранное" и связывает его с пользователем:
const addFavoriteMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  // Сохранение фильма в базе данных:
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id, // Связываем фильм с текущим пользователем по id
  })
    .then((movie) => res.send(movie))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequestErr(WRONG_DATA_MOVIE));
      } else {
        next(e);
      }
    });
};

// Убираем фильм из избранного с помощью функции removeFavoriteMovie:
const removeFavoriteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundErr(MOVIE_ID_NOT_FOUND);
    })
    .then((movie) => {
      const owner = movie.owner.toString();

      // Проверка, является ли наш пользователь владельцем фильма:
      if (req.user._id === owner) {
        Movie.deleteOne(movie)
          .then(() => {
            res.send(movie);
          })
          .catch(next);
      } else {
        throw new ForbiddenErr(MOVE_REMUVE_ERROR);
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequestErr(WRONG_DATA_MOVIE_REMUVE));
      } else {
        next(e);
      }
    });
};

module.exports = {
  getMovies,
  addFavoriteMovie,
  removeFavoriteMovie,
};
