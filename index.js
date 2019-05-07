const express    = require('express');
const bodyParser = require('body-parser');
const uuid       = require('uuid');
const mongoose   = require('mongoose');
const Models     = require('./models.js');
// importing mongoose schemas
const Movies     = Models.Movie;
const Users      = Models.User;
const app        = express();

app.use(bodyParser.json());

//connect to mongoDB movies and users collections
mongoose.connect('mongodb://localhost:27017/moviesDB', {useNewUrlParser: true});


// Returns a list of ALL movies to the user
app.get('/movies', (req, res) => {
  res.json(movieList);
  // res.sendFile('topMovies.JSON', { root : __dirname })
});

// Returns data about a single movie by title to the user
app.get('/movies/:title', (req, res) => {
  res.json(movieList.find((movie) => {
    return movie.title === req.params.title
  }));
});

// Returns data about a genre (description) by name/title (e.g., “Thriller”)
app.get('/movies/genres/:genre', (req, res) => {
  res.json(movieList.filter(movie => {
    return movie.genre === req.params.genre;
  }));
});

// Returns data about a director bio
app.get('/directors/:director', (req, res) => {
  res.json(directorsList.find((obj) => {
    return obj.name === req.params.director
  }));
});

// For postman testing purposes, returns a list of all users
app.get('/users', (req, res) => {
  res.json(usersList);
});

// Allow new users to register
app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    usersList.push(newUser);
    res.status(201).send(newUser);
  }
});

// Allow users to update their info (email, date of birth)
app.put('/users/:name/:email', (req, res) => {
  let user = usersList.find((user) => { return user.name === req.params.name });

  if (user) {
    user.email = req.params.email;
    // user.dateOfBirth = req.params.dateOfBirth;
    res.status(201).send('User ' + req.params.name + ' changed email to ' + req.params.email ); //+ ' and date of birth to ' + req.params.dateOfBirth);
  } else {
    res.status(404).send('User: ' + req.params.name + ' not found.')
  }
});

// Allow users to add a movie to their list of favorites
app.post('/users/:name/favorites', (req, res) => {
  let newFavoriteMovie = req.body;

  if (!newFavoriteMovie) {
    const message = 'Missing movie name in request body';
    res.status(400).send(message);
  } else {
    let user = usersList.find((user) => { return user.name === req.params.name });
    user.favoriteMovies.push(newFavoriteMovie.movie);
    res.status(201).send(user.favoriteMovies);
  }
});

// Allow users to remove a movie from their list of favorites
app.delete('/users/:name/favorites', (req, res) => {
  let removeFavoriteMovie = req.body;

  if (!removeFavoriteMovie) {
    const message = 'Missing movie name in request body';
    res.status(400).send(message);
  } else {
    let user = usersList.find((user) => { return user.name === req.params.name });
    let newFavoriteMovies = user.favoriteMovies.filter(obj => {return obj !== removeFavoriteMovie.movie;});
    user.favoriteMovies = newFavoriteMovies;
    res.status(201).send(newFavoriteMovies);
  }
});

// Allow users to delete profile
app.delete('/users/:name', (req, res) => {
  let user = usersList.find(user => {
    return user.name === req.params.name;
  });
  if (!user) {
    res.status(400).send('User not found.');
  } else {
    let newUserList = usersList.filter(obj => {
        return obj !== user;
    });
    usersList = newUserList;
    res.status(201).send(`User ${req.params.name} was deleted.`);
  }
});

// Serves documentation file
app.get('/documentation', (req, res) => {
  res.sendFile('/public/documentation.html', { root: __dirname })
});

// '*' every other wrong url prefix
app.get('*', (req, res) => {
  res.sendFile('/public/documentation.html', { root: __dirname })
});

app.listen(8080, () => {
  console.log('App listening on port 8080');
});
