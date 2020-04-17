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

  /**
   *
   * @returns all genres
   */
  static getGenres() {
    return ALL_GENRES;
  }

  /**
   *
   * @param {function} cb receive callback function
   * @returns an array of books
   */
  getAllMovies(cb) {
    this.db.all(
      `select movies.title, movies.genres, ROUND(avg(ratings.rating),1) as averageRating from movies INNER JOIN ratings ON movies.movieId = ratings.movieId GROUP BY movies.title HAVING COUNT(ratings.rating) >= 20 order by averageRating desc`,
      cb
    );
  }

  /**
   *
   * @param {string} genre receive genre of movie
   * @param {function} cb receive callback function
   * @returns a filtered array
   */
  getMoviesByGenre(genre, cb) {
    this.getAllMovies((err, movies) => {
      return cb(
        null,
        movies.filter((movie) => movie.genres.includes(genre))
      );
    });
  }

  /**
   *
   * @param {array} data receive array of data
   * @returns an array after splitting genres into an array
   */
  splitGenres(data) {
    return data.map((movie) => {
      movie.genres = movie.genres.split('|');
      return movie;
    });
  }
};
