import React from "react";
import { Col } from "antd";

import "./movie-page.css";
import VideoPlayer from "../video-player";
import MovieDescription from "../movie-description";
import MovieNameAndAddToFavorite from "../movie-name-add-to-favorite";
import MovieRate from "../movie-rate";

const MoviePage = props => {
  const {
    Actors,
    Country,
    Director,
    Plot,
    Poster,
    Title,
    Type,
    Runtime,
    Year,
    imdbRating,
    imdbVotes,
    Released,
    Genre,
    totalUsersRate,
    totalUsersVotes,
    _id
  } = props.movieDescription;
  const replacedYear = (Year) ? Year.replace(new RegExp("–", "ig"), "") : null;

  return (
    // <Col span={18}>
    <React.Fragment>

      <MovieNameAndAddToFavorite
        movieId={_id}
        title={Title}
      />

      <MovieDescription
        genre={Genre}
        released={Released}
        year={replacedYear}
        type={Type}
        actors={Actors}
        poster={Poster}
        runtime={Runtime}
        imdbRating={imdbRating}
        imdbVotes={imdbVotes}
        country={Country}
        director={Director}
      />

      <Col className="bottom-line">
        {/* blue-line */}
      </Col>

      {/* rating block */}
      <MovieRate
        movieId={_id}
        usersRate={totalUsersRate}
        usersVotes={totalUsersVotes}
      />

      {/* plot block */}
      <Col className="plot-block-wrap">
        <span>
          {Plot}
        </span>
      </Col>

      {/* video-block */}
      <div className="video-player-header">
        {props.movieDescription.Title}
      </div>

      <Col>
        <VideoPlayer
          genre={Genre}
          type={Type}
          title={Title}
          movieId={_id}
        />
      </Col>

    </React.Fragment>
    // </Col>
  );
};

export default MoviePage;
