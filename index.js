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
  Movies.find()
  .then(function (movies) {
    res.status(201).json(movies)
  })
  .catch(function (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Returns data about a single movie by title to the user
app.get('/movies/:title', (req, res) => {
  Movies.findOne({
    Title: req.params.Title
  })
  .then(function (movie) {
    res.json(movie)
  })
  .catch(function (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Returns data about a genre description by name/title (e.g., “Thriller”)
app.get('/movies/genres/:genre', (req, res) => {
  Movies.findOne({
    Title: req.params.Title
  })
  .then(function (movie) {
    if (movie) {
      res.status(201).send('The genre of ' + movie.Title + ' is ' + movie.Genre);
    } else {
      res.status(404).send('Movie with the title ' + req.params.Title + ' was not found.');
    }
  })
  .catch(function (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Returns data about a director bio
app.get('/directors/:director', (req, res) => {
  Movies.findOne({
    'Director.Name': req.params.Name
  })
  .then(function (director) {
    res.json(director)
  })
  .catch(function (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// For postman testing purposes, returns a list of all users
app.get('/users', (req, res) => {
  Users.find()
  .then(function (users) {
    res.status(201).json(users)
  })
  .catch(function (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  })
});

// Allow new users to register
app.post('/users', (req, res) => {
  Users.findOne({
    Username: req.body.Username
  })
  .then(function (user) {
  if (user) {
    return res.status(400).send(req.body.Username + ' already exists');
  } else {
    Users
    .create({
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    })
    .then(function (user) {
      res.status(201).json(user)
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send('Error: ' + error);
    })
  }
  }).catch(function (error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

// Allow users to update their info (Username, Password, Email and Birthday)
app.put('/users/:Username', function (req, res) {
  Users.update({
      Username: req.params.Username
  }, {
    $set: {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  }, {
    new: true
  }, // This line makes sure that the updated document is returned
  function (err, updatedUser) {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser)
    }
  })
});

// Allow users to add a movie to their list of favorites
app.post('/users/:Username/FavoriteMovies/:MovieID', function (req, res) {
  Users.findOneAndUpdate({
    Username: req.params.Username
  }, {
    $push: {
      FavoriteMovies: req.params.MovieID
    }
  }, {
    new: true
  }, // This line makes sure that the updated document is returned
  function (err, updatedUser) {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser)
    }
  })
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
