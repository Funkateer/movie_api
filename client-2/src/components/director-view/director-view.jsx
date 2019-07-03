import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import './director-view.scss';

function DirectorView(props) {
  const { movies, directorName } = props;

  if (!movies || !movies.length) return null;

  const director = movies.find(movie => movie.Director.Name === directorName).Director;

  return (
    <div className="director-view">
      <h1 className="director">{director.Name}</h1>
      <h2>Biography</h2>
      <div className="bio">{director.Bio}</div>
      <h2>Born</h2>
      <div className="birth">{director.Birth}</div>
      <Link to={'/'}>
        <Button variant="primary" type="button">
        BACK
        </Button>
      </Link>
    </div>
  );
}

export default connect(({movies}) => ({movies}))(DirectorView);