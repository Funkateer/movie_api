import React from 'react';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { movies, visibilityFilter, sortColumn } = state;

  let  moviesToShow = movies.concat().sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return -1;
    if (a[sortColumn] > b[sortColumn]) return 1;
    return 0
  });

  if (visibilityFilter !== '' && sortColumn === 'Title') {
    moviesToShow = moviesToShow.filter(movie => movie.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (visibilityFilter !== '' && sortColumn === 'Genre') {
    moviesToShow = moviesToShow.filter(movie => movie.Genre.Name.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (visibilityFilter !== '' && sortColumn === 'Director') {
    moviesToShow = moviesToShow.filter(movie => movie.Director.Name.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  return { movies: moviesToShow };
};

function MoviesList(props) {
  const { movies } = props;

  if (!movies) return <div className="main-view" />;

  return <div className="movie-list">
    <VisibilityFilterInput />
    <Container>
      <Row>
      {movies.map(movie => (
        <Col key={movie._id} xs={6} sm={6} md={4}>
          <MovieCard key={movie._id} movie={movie} />
        </Col>
      ))
      }
      </Row>
    </Container>
  </div>;
}

export default connect(mapStateToProps)(MoviesList);
