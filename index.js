const express = require('express');
const morgan = require('morgan');

const app = express();

// logging with morgan
app.use(morgan('common'));

// serve documentation.html file from the public folder
app.use(express.static('public'));

// error handling
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Something went wrong...');
});

// '/movies' route response, return movie data
app.get('/movies',(req,res)=>
 {
  res.sendFile('topMovies.JSON', { root : __dirname })
});

// '/' aka home route response
app.get('/', (req, res) => {
  res.send('Welcome to my first RESTful API')
});

// '*' every other wrong url prefix
app.get('*', (req, res) => {
  res.sendFile('img/obi1.png', { root : __dirname })
});

app.listen(8080, () =>{
  console.log('App listening on port 8080')
});
