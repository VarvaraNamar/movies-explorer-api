const router = require('express').Router();

// Вывод сообщений об ошибках:
const { URL_NOT_FOUND } = require('../utils/messegeConstants');

// Импорт middleware для аутентификации пользователя.
const auth = require('../middlewares/auth');

// Импорт маршрутов для пользователей и фильмов.
const userRouter = require('./users');
const movieRouter = require('./movies');

// Импорт обработчиков для регистрации и входа пользователя.
const { produceUser, loginUser } = require('../controllers/users');

// Импорт валидаторов для проверки данных при регистрации и входе пользователя.
const {
  loginUserValidator,
  produceUserValidator,
} = require('../middlewares/validation');

// Импорт пользовательской ошибки для обработки ошибки 404 - страница не найдена.
const NotFoundErr = require('../errors/NotFoundErr');

// POST-запрос для регистрации пользователя.
router.post('/signup', produceUserValidator, produceUser);

// POST-запрос для авторизации пользователя.
router.post('/signin', loginUserValidator, loginUser);

// Применение middleware auth ко всем маршрутам, расположенным ниже этой строки.
router.use(auth);

// Использование маршрутов пользователей и фильмов.
router.use('/', userRouter);
router.use('/', movieRouter);

// Маршрут-перехватчик, который ловит все запросы, не совпадающие с предыдущими маршрутами.
router.use('*', (req, res, next) => {
  next(new NotFoundErr(URL_NOT_FOUND));
});

module.exports = router;
