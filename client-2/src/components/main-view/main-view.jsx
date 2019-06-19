import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route} from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

import './main-view.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export class MainView extends React.Component {

  // Call the superclass constructor
  // so React can initialize it
  constructor(props) {
    super(props);

    // Initialize the state to an empty object so we can destructure it later
    this.state = {
      movies: null,
      selectedMovieId: null,
      user: null,
      newUser:null
    };
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    // axios.get('https://cineteca.herokuapp.com/movies')
    // .then(response => {
    //   console.log(response);
    //   // Assign the result to the state
    //   this.setState({
    //     movies: response.data
    //   });
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });

    window.addEventListener('hashchange', this.handleNewHash, false);

    this.handleNewHash();

    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }


  handleNewHash = () => {
    const movieId = window.location.hash.replace(/^#\/?|\/$/g, '').split('/');

    this.setState({
      selectedMovieId: movieId[0]
    });
  }

  // register new user
  registerUser() {
    this.setState({
      newUser: true
    });
  }

  userRegistered() {
    this.setState({
      newUser: null
    });
  }

  //log in
  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  // get list of all movies
  getMovies(token) {
    axios.get('https://cineteca.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  //go to movie view
  onMovieClick(movie) {
    this.setState({
      selectedMovieId: movie._id
    });
    window.location.hash = '#' + movie._id;
  }

  //logout function for Logout button
  logOut() {
    //clears storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    //resets user state to render again
    this.setState({
      user: null
    });

    //make sure login screen appears after logging out
    window.open('/', '_self');
  }

  resetMainView() {
    this.setState({
      selectedMovieId: null
    });
    window.location.hash = '#';
  }

  render() {
    const { movies, selectedMovieId, user, newUser } = this.state;

    if (!user) {
      if (newUser) return <RegistrationView userRegistered={() => this.userRegistered()} onLoggedIn={user => this.onLoggedIn(user)} />;
      else return <LoginView onLoggedIn={user => this.onLoggedIn(user)} newUser={() => this.registerUser()} userRegistered={() => this.userRegistered()} />;
    }

    if (!movies) return <div className="main-view"/>;

    const selectedMovie = selectedMovieId ? movies.find(movie => movie._id === selectedMovieId) : null;

    return (
      // <Router>
      //     <div className="main-view">
      //         <Route exact path="/" render={() => movies.map(movie => <MovieCard key={movie._id} movie={movie} />)} />
      //         <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
      //     </div>
      // </Router>

      <Container className='main-view' fluid='true'>
        <Row>
          {selectedMovie
            ? <Col><MovieView returnCallback={() => this.resetMainView()} movie={selectedMovie} /></Col>
            : movies.map(movie => {
              return (
                <Col xl={3} sm={6} md={4} xs={12}><MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} /></Col>
              )
            })
          }
        </Row>
        <Button onClick={() => this.logOut()}>Logout</Button>
      </Container>
    );//return
  }//render

}
