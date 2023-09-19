const userRouter = require('express').Router();

// Импорт функций для работы с данными пользователя.
const { getCurrentUser, changeUserInfo } = require('../controllers/users');

// Импорт констант валидаторов:
const { changeUserInfoValidator } = require('../middlewares/validation');

// GET-запрос для получения данных пользователя.
userRouter.get('/users/me', getCurrentUser);
// PATCH-запрос для обновления данных пользователя.
userRouter.patch('/users/me', changeUserInfoValidator, changeUserInfo);

module.exports = userRouter;
