import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { movies, visibilityFilter, sortColumn } = state;

  let sortedMovies = movies.concat().sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return -1;
    if (a[sortColumn] > b[sortColumn]) return 1;
    return 0;
  });

  if (visibilityFilter !== '') {
    moviesToShow = moviesToShow.filter(m => m.title.includes(visibilityFilter));
  }

  return { movies: sortedMovies };
};

function MoviesList(props) {
  const { movies } = props;

  if (!movies) return <div className="main-view"/>;

  return <div className="movies-list">
    <VisibilityFilterInput/>
    {movies.map(m => <MovieCard key={m._id} movie={m}/>)}
  </div>;}

export default connect(mapStateToProps)(MoviesList);