const sqlite3 = require('sqlite3');

const ALL_GENRES = [
  'Action',
  'Adventure',
  'Animation',
  'Children',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Fantasy',
  'Film-Noir',
  'Horror',
  'IMAX',
  'Musical',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'War',
  'Western',
];

module.exports = class MovieService {
  constructor(store) {
    this.store = store;
    this.db = new sqlite3.Database(this.store);
  }

  static getGenres() {
    return ALL_GENRES;
  }

  getAllMovies(cb) {
    this.db.all(
      `select movies.title, movies.genres, ROUND(avg(ratings.rating),1) as averageRating from movies INNER JOIN ratings ON movies.movieId = ratings.movieId GROUP BY movies.title HAVING COUNT(ratings.rating) >= 20 order by averageRating desc`,
      cb
    );
  }

  getMoviesByGenre(genre, cb) {
    // TODO: implement this method to return movies of a specified genre
    return cb(null, []);
  }
};
