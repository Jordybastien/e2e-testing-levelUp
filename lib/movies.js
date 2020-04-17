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
      `select movies.title, movies.genres, ROUND(avg(ratings.rating),1) as averageRating, ratings.movieId from movies INNER JOIN ratings ON movies.movieId = ratings.movieId GROUP BY movies.title HAVING COUNT(ratings.rating) >= 20 order by averageRating desc`,
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

  /**
   *
   * @param id movieId
   * @param {function} cb receive callback function
   * @returns an array of movie ratings base on movieId
   */
  getMovieDetails(id, cb) {
    this.db.all(
      `select * from ratings INNER JOIN movies USING(movieId) where movieId = ${id} ORDER BY timestamp DESC LIMIT 5`,
      cb
    );
  }

  /**
   *
   * @param {array} data receive array of data
   * @returns an array after formating timestamp
   */
  formatDate(data) {
    return data.map((movie) => {
      const val = new Date(movie.timestamp * 1000);
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      const time =
        val.getDate() +
        ' ' +
        months[val.getMonth()] +
        ' ' +
        val.getFullYear() +
        ' ' +
        val.getHours() +
        ':' +
        val.getMinutes() +
        ':' +
        val.getSeconds();
      movie.timestamp = time;
      return movie;
    });
  }
};
