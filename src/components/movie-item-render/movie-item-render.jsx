import React from "react";
import SortedPanelMovies from "../sorted-movies-panel";
import MovieType from "../movie-type/movie-type";
import MovieRender from "../movie-render/movie-render";

const MovieItemRender = ({ signature, movies = [], watchAll, sortedPanel }) => {
  const type = movies[0] ? movies[0].Type : "";
  return (
    <React.Fragment>
      {sortedPanel ? <SortedPanelMovies /> : null}
      <MovieType type={type} signature={signature} watchAll={watchAll} />
      <MovieRender movies={movies} />
    </React.Fragment>
  );
};

export default MovieItemRender;
