const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

let movieList =
[
  {
    title: 'The bluse brothers',
    year: 1980,
    Director: 'John Landis',
    genre:'musical',
    Starrings:[
      'John Belushi',
      'Dan Aykroyd',
      'James Brown',
      'Cab Calloway',
      'Ray Charles',
      'Carrie Fisher',
      'Aretha Franklin',
      'Henry Gibson'
    ]
  },
  {
    title: 'Monty Python\'s the meaning of life',
    year: 1983,
    Director: 'Terry Jones',
    genre:'comedy',
    Starrings:[
      'Graham Chapman',
      'John cleese',
      'Terry Gilliam',
      'Eric Idle',
      'Terry Jones',
      'Michael Palin'
    ]
  },
  {
    title: 'The Big Lebowski',
    year: 1998,
    Director: 'Joel Coen',
    genre:'comedy',
    Starrings:[
      'Jeff Bridges',
      'John Goodman',
      'Julianne Moore',
      'Steve Buscemi',
      'David Huddleston',
      'John Turturro'
    ]
  },
  {
    title: 'Lion of the desert',
    year: 1981,
    Director: 'Mustapha Akkad',
    genre:'historical',
    Starrings:[
      'Anthony Quinn',
      'Oliver Reed',
      'Rod Steiger',
      'Raf Vallone'
    ]
  },
  {
    title: 'The AristoCats',
    year: 1970,
    Director: 'Wolfgang Reitherman',
    genre:'Animation',
    Starrings:[
      'Phil Harris',
      'Eva Gabor',
      'Hermione Baddeley',
      'Gary Dubin',
      'Dean Clark',
      'Sterling Holloway',
      'Roddy Maude-Roxby',
      'Liz English'
    ]
  },
  {
    title: 'The Hitchhiker\'s Guide to the Galaxy',
    year: 2005,
    Director: 'Garth Jennings',
    genre:'sci-fi',
    Starrings:[
      'Sam Rockwell',
      'Mos Def',
      'Zooey Deschanel',
      'Martin Freeman',
      'Bill Nighy',
      'Anna Chancellor',
      'John Malkovich'
    ]
  },
  {
    title: 'Porco Rosso',
    year: 1992,
    Director: 'Hayao Miyazaki',
    genre:'animation',
    Starrings:[
      'Shūichirō Moriyama',
      'Tokiko Kato',
      'Akemi Okamura',
      'Akio Ōtsuka'
    ]
  },
  {
    title: 'Il Marchese del Grillo',
    year: 1981,
    Director: 'Mario Monicelli',
    genre:'comedy',
    Starrings:[
      'Alberto Sordi',
      'Paolo Stoppa',
      'Flavio Bucci',
      'Camillo Milli'
    ]
  },
  {
    title: 'Young Frankenstein',
    year: 1974,
    Director: 'Mel Brooks',
    genre:'comedy',
    Starrings:[
      'Gene Wilder',
      'Peter Boyle',
      'Marty Feldman',
      'Cloris Leachman',
      'Teri Garr',
      'Kenneth Mars',
      'Madeline Kahn'
    ]
  },
  {
    title: 'eraserhead',
    year: 1977,
    Director: 'David Lynch',
    genre:'experimental',
    Starrings:[
      'Jack Nance',
      'Charlotte Stewart',
      'Allen Joseph',
      'Jeanne Bates'
    ]
  },
  {
    title: 'Howl\'s Moving Castle',
    year: 2004,
    Director: 'Hayao Miyazaki',
    genre:'animation',
    Starrings:[
      'Chieko Baisho',
      'Takuya Kimura',
      'Akihiro Miwa'
    ]
  }

]

let directorsList = [
  {
    name : 'John Landis',
    bio : 'John David Landis is an American film director, screenwriter, actor, and producer. He is best known for the comedy films that he has directed, such as National Lampoon\'s Animal House (1978), The Blues Brothers (1980), An American Werewolf in London (1981), Trading Places (1983), Three Amigos (1986), Coming to America (1988) and Beverly Hills Cop III (1994), and for directing Michael Jackson\'s music videos for "Thriller" (1983) and "Black or White" (1991).',
    birthYear : 1950
  },
  {
    name : 'Terry Jones',
    bio : 'Terence Graham Parry Jones is a Welsh actor, writer, comedian, screenwriter, film director and historian, best known as a member of the Monty Python comedy troupe. After graduating from Oxford University with a degree in history, Jones and writing partner Michael Palin (whom he met at Oxford) wrote and performed for several high-profile British comedy programmes, including Do Not Adjust Your Set and The Frost Report, before creating Monty Python\'s Flying Circus with Cambridge graduates Eric Idle, John Cleese, and Graham Chapman, and American animator/filmmaker Terry Gilliam. Jones was largely responsible for the programme\'s innovative, surreal structure, in which sketches flowed from one to the next without the use of punchlines. He made his directorial debut with the team\'s first film, Monty Python and the Holy Grail, which he co-directed with Gilliam, and also directed the subsequent Python films, Life of Brian and The Meaning of Life.',
    birthYear : 1942
  },
  {
    name : 'Joel Coen',
    bio : 'Joel Coen is a producer and writer, known for The Ballad of Buster Scruggs (2018), Fargo (1996) and A Serious Man (2009). He has been married to Frances McDormand since April 1, 1984. They have one child.',
    birthYear : 1954
  },
  {
    name : 'Mustapha Akkad',
    bio : 'Moustapha Al Akkad was a Syrian American film producer and director, best known for producing the original series of Halloween films and directing The Message and Lion of the Desert. He was killed along with his daughter Rima Al Akkad Monla in the 2005 Amman bombings.',
    birthYear : 1930
  },
  {
    name : 'Wolfgang Reitherman',
    bio : 'Wolfgang Reitherman also known and sometimes credited as Woolie Reitherman, was a German-American animator, director, and producer who was one of Disney\'s Nine Old Men.',
    birthYear : 1909
  },
  {
    name : 'Garth Jennings',
    bio : 'Garth Jennings is a British film director, screenwriter, producer and actor. He is best known for directing the films The Hitchhiker\'s Guide to the Galaxy, Son of Rambow and Sing. Jennings co-founded the production company Hammer & Tongs.',
    birthYear : 1972
  },
  {
    name : 'Hayao Miyazaki',
    bio : 'Hayao Miyazaki is a Japanese animator, filmmaker, screenwriter, cartoonist, author, and manga artist. A co-founder of Studio Ghibli, a film and animation studio, he has attained international acclaim as a masterful storyteller and as a maker of anime feature films, and is widely regarded as one of the greatest animation filmmakers.',
    birthYear : 1941
  },
  {
    name : 'Mario Monicelli',
    bio : 'Mario Monicelli was an Italian director and screenwriter and one of the masters of the Commedia all\'Italiana (Comedy Italian style). He was nominated six times for an Oscar.',
    birthYear : 1915
  },
  {
    name : 'Mel Brooks',
    bio : 'Mel Brooks is an American filmmaker, actor, comedian, and composer. He is known as a creator of broad film farces and comedic parodies. Brooks began his career as a comic and a writer for the early TV variety show Your Show of Shows. He created, with Buck Henry, the hit television comedy series Get Smart, which ran from 1965 to 1970.',
    birthYear : 1926
  },
  {
    name : 'David Lynch',
    bio : 'David Keith Lynch is an American filmmaker, painter, musician, actor, and photographer. He has been described by The Guardian as "the most important director of this era", while AllMovie called him "the Renaissance man of modern American filmmaking". His films Blue Velvet (1986) and Mulholland Drive (2001) are widely regarded by critics to be among the greatest films of their respective decades, while the success of his 1990–91 television series Twin Peaks led to him being labeled "the first popular Surrealist" by film critic Pauline Kael. He has received three Academy Award nominations for Best Director',
    birthYear : 1946
  }
];

let usersList = [
  {
    id : 1,
    name : 'Barton Fink',
    email : 'fink.barton@noemail.com',
    dateOfBirth : '10/01/1981',
    favoriteMovies : []
  },
  {
    id : 2,
    name : 'Thomas O`Malley',
    email : 'malley-the-alleycat@miaowl.com',
    dateOfBirth : '02/07/2012',
    favoriteMovies : []
  },
  {
    id : 3,
    name : 'Fujiko Mine',
    email : 'mine.margot@chanel.com',
    dateOfBirth : '12/07/1985',
    favoriteMovies : []
  }
];

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
