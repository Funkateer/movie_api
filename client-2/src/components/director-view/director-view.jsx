import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import './director-view.scss';

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const {director} = this.props;

    if (!director) return null;

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
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string,
    Bio: PropTypes.string,
    Birth: PropTypes.string
  }).isRequired
};
