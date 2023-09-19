const movieRouter = require('express').Router();

// Импорт функций с фильмами.
const {
  getMovies,
  addFavoriteMovie,
  removeFavoriteMovie,
} = require('../controllers/movies');

// Импорт констант валидаторов:
const {
  addFavoriteMovieValidator,
  removeFavoriteMovieValidator,
} = require('../middlewares/validation');

// GET-запрос для получения списка фильмов.
movieRouter.get('/movies', getMovies);

// POST-запрос для добавления фильма в избранное.
movieRouter.post('/movies', addFavoriteMovieValidator, addFavoriteMovie);

// DELETE-запрос для удаления фильма из избранного.
movieRouter.delete(
  '/movies/:movieId',
  removeFavoriteMovieValidator,
  removeFavoriteMovie,
);

// Экспорт роутера:
module.exports = movieRouter;
