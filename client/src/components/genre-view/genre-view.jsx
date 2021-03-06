import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import './genre-view.scss';

/** @function GenreView */
function GenreView(props) {
  const { movies, genreName } = props;

  if (!movies || !movies.length) return null;

  const genre = movies.find(movie => movie.Genre.Name === genreName).Genre;

  return (
    <div className="genre-view">
      <h1 className="genre">{genre.Name}</h1>
      <div className="description">{genre.Description}</div>
      <Link to={'/'}>
        <Button variant="primary" type="button">
          BACK
        </Button>
      </Link>
    </div>
  );
}

export default connect(({movies}) => ({movies}))(GenreView);
