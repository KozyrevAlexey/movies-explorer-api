const router = require('express').Router();
const { validateMovieId, validateNewMovie } = require('../utils/regex');

const { getMovies, createMovie, deliteMovieById } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validateNewMovie, createMovie);
router.delete('/:_id', validateMovieId, deliteMovieById);

module.exports = router;