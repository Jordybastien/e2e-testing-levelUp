let express = require('express');
let router = express.Router();

const path = require('path');
const MovieService = require('../lib/movies');
const movieService = new MovieService(path.join(__dirname, '..', 'movies.db'));

router.get('/movies/all', function (req, res) {
  movieService.getAllMovies((err, movies) => {
    const data = movieService.splitGenres(movies);
    res.json(data);
  });
});

router.get('/movies/byGenre/:genre', function (req, res) {
  movieService.getMoviesByGenre(req.params.genre, (err, movies) => {
    const data = movieService.splitGenres(movies);
    res.json(data);
  });
});

module.exports = router;
