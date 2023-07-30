const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const ErrorNotFound = require('../errors/errorNotFound');
const { validateCreateUser, validateLogin } = require('../utils/regex');


router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);

router.use('/users', userRoutes);
router.use('/cards', movieRoutes);

router.use('*', (req, res, next) => {
  next(new ErrorNotFound('Нет такого маршрута'))
});

module.exports = router;