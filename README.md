# One Movie Fund

This is a small Node server using handlebars to render items from the server.


## Set up Project
#### 1. Clone the repository:
`git clone https://github.com/Jordybastien/e2e-testing-levelUp.git`

#### 2. Install all the dependencies necessary on this application
`npm install`

#### 3. Start the application
`npm start`

#### 4. Proceed to Testing functionalities

### 1. Unit testing
#### 1.1 After installing all dependencies

#### 1.2. Run test by running command `npm test`

#### 1.3. To view coverage run command `npm run coverage`

### 2. E2E End to End testing
#### 1.1 After installing all dependencies

#### 1.2 Refer to cypress documentation in case of complications `https://docs.cypress.io/guides/guides/command-line.html`

#### 1.3. Start the application because end to end testing needs the server to be running
`npm start`

#### 1.4. Run test by running command `npm run cy:run`

## Project Overview

This project is a simple web application showing a list of movies (downloaded from the free [MovieLens](https://grouplens.org/datasets/movielens/) dataset).

It uses the following libraries / technologies - don't hesitate to refer to the docs if you need to:

* [SQLite](https://sqlite.org/index.html) as a simple file database with all the movie data
* [NodeJS](https://nodejs.org/en/) to run the web server, and more specifically:
  * [Express](http://expressjs.com/) as web / routing framework
  * [Handlebars](https://handlebarsjs.com/) as simple HTML templating engine
* [Bootstrap](https://getbootstrap.com/) and [jQuery](https://jquery.com/) for the client-side web pages
* [Mocha](https://mochajs.org/) as test framework, with the [chai](https://www.chaijs.com/) assertion library and [chai-http](https://www.chaijs.com/plugins/chai-http/) plugin used for the HTTP tests

## Project Structure

Here's the (simplified) project structure:

```text
project
├── README.md
├── app.js              --> the main app
├── movies.db           --> the SQLite movie database
├── lib
│   └── movies.js       --> the main business logic handling movie information, as a plain NodeJS Module
├── routes
│   ├── api.js          --> the Express routes for the REST API layer exposing the movie logic
│   └── index.js        --> the Express routes for the server-side HTML page rendering
├── views
│   ├── index.hbs       --> the template for all movie list pages
│   └── index.js        --> the template for the general site layout
├── public              --> exposed by the web server on the root /
│   └── stylesheets
│       └── style.css   --> the site's custom styles
└── tests
    ├── movies.unit.test.js       --> unit tests for the movies lib
    └── api.test.js    --> API tests
```

## Database structure

The sqlite database in `movies.db` contains the two following tables (you can browse it with the free [SQLite browser](https://sqlitebrowser.org/) for instance):

### movies

```sql
CREATE TABLE "movies" (
    "movieId"   INTEGER NOT NULL UNIQUE,
    "title"     TEXT NOT NULL,
    "genres"    TEXT,
    PRIMARY KEY("movieId")
);
```

The genres are stored as a `|`-separated list of strings.

### ratings

```sql
CREATE TABLE "ratings" (
    "userId"     INTEGER,
    "movieId"    INTEGER,
    "rating"     REAL,
    "timestamp"  INTEGER
);
```

## REST API

The following REST API is currently implemented:

* `GET /rest/movies/all`

```json
[
  {
    "title": "Black Butler: Book of the Atlantic (2017)",
    "genres": "Action|Animation|Comedy|Fantasy"
  },
  {
    "title": "No Game No Life: Zero (2017)",
    "genres": "Animation|Comedy|Fantasy"
  },
  {
    "title": "Flint (2017)",
    "genres": "Drama"
  },
  {
    "title": "Bungo Stray Dogs: Dead Apple (2018)",
    "genres": "Action|Animation"
  },
  {
    "title": "Andrew Dice Clay: Dice Rules (1991)",
    "genres": "Comedy"
  }
]
```
