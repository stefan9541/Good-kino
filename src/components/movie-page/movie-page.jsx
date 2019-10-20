import React from "react";
import { Col, Rate } from "antd";

import "./movie-page.css";
import VideoPlayer from "../video-player";
import MovieDescription from "../movie-description";
import MovieNameAndAddToFavorite from "../movie-name-add-to-favorite";

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
    _id
  } = props.movieDescription;
  const replacedYear = (Year) ? Year.replace(new RegExp("–", "ig"), "") : null;

  return (
    // <Col span={18}>
    <React.Fragment>

      <MovieNameAndAddToFavorite
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
      <Col className="rate-block-wrap">
        <span style={{ color: "#0faeef" }}>Оцени Фильм: &#160; &#160;</span>
        <Rate count={10} allowClear={false} />
        <span>(55)</span>
      </Col>

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
        <VideoPlayer movieId={_id} />
      </Col>
      {"asdasdasd"}
    </React.Fragment>
    // </Col>
  );
};

export default MoviePage;
