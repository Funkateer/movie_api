const express = require('express');
const morgan = require('morgan');

const app = express();

// '/movies' route response, return movie data
app.get('/movies',(req,res)=>
 {
  res.sendFile('topMovies.JSON', { root : __dirname })
});

// '/' aka home route response
app.get('/', (req, res) => {
  res.send('Welcome to my first RESTful API')
});


app.listen(8080, () =>{
  console.log('App listening on port 8080')
});
