import React from "react";
import { Col } from "antd";
import { Link } from "react-router-dom";

import "./movie-description.css";

const MovieDescription = React.memo(props => {
  const {
    genre,
    released,
    year,
    type,
    actors,
    poster,
    runtime,
    imdbRating,
    imdbVotes,
    country,
    director
  } = props;
  return (
    <Col className="movie-description-wrap">
      <Col span={7} className="movie-poster">
        <img src={poster} alt="movie poster" />
      </Col>
      <Col className="movie-description">
        <ul className="description-list">
          <li>
            <b>Рейтинги:</b> imdb: {imdbRating}  <small>({imdbVotes})</small>
          </li>
          <li>
            <b>Год Выпуска:</b> <Link to={`/${type}/year/${year}`}>{year}</Link>
          </li>
          <li>
            <b>Дата выхода:</b> {released}
          </li>
          <li>
            <b>Страна:</b> {country}
          </li>
          <li>
            <b>Продолжительность:</b> {runtime}
          </li>
          <li>
            <b>Жанр:</b> {genre}
          </li>
          <li>
            <b>Режиссер:</b> {director}
          </li>
          <li>
            <b>В ролях:</b> {actors}
          </li>
        </ul>
      </Col>
    </Col>
  );
});

export default MovieDescription;
