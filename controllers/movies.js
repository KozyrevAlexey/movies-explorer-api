const Movie = require('../models/movie');

const ErrorValidation = require('../errors/errorValidation');
const ErrorNotFound = require('../errors/errorNotFound');
const ErrorForbidden = require('../errors/errorForbidden.js');

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    owner,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movies) => res.send(movies))
    .catch((err) => {
      if (err.name = "ValidationError") {
        next(new ErrorValidation(`Переданные данные некорректны`));
      } else {
        next(err);
      }
    });
}

const deliteMovieById = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => new ErrorNotFound(`Карточка для удаления не найдена`))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.deleteOne(movie)
          .then(() => res.send({ data: movie }))
          .catch(next)
      } else {
        throw new ErrorForbidden('Чужую карточку удалить нельзя')
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deliteMovieById,
};