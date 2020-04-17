const assert = require('chai').assert;
const path = require('path');
const MovieService = require('../lib/movies');
const movieService = new MovieService(path.join(__dirname, '..', 'movies.db'));
const mockData = require('./__mocks__');

describe('Movies unit tests', () => {
  it('should return many movies', (done) => {
    movieService.getAllMovies((err, movies) => {
      assert.isAbove(movies.length, 1000);
      done();
    });
  });

  it('should return movies by genre', (done) => {
    const genre = 'Action';
    movieService.getMoviesByGenre(genre, (err, movies) => {
      assert.equal(movies.length, 421);
      done();
    });
  });

  it('should return all genres', (done) => {
    const genres = MovieService.getGenres();
    assert.equal(genres.length, mockData.genres.length);
    done();
  });

  it('should return five single movie details', (done) => {
    const movieId = 1233;
    movieService.getMovieDetails(movieId, (err, movies) => {
      assert.equal(movies.length, 5);
      done();
    });
  });

  it('should formate date of movies ratings', (done) => {
    const movieId = 1233;
    movieService.getMovieDetails(movieId, (err, movies) => {
      const formatedDate = movieService.formatDate(movies);
      assert.equal(formatedDate[0].timestamp, '30 Jun 2017 6:40:53');
      done();
    });
  });
});
