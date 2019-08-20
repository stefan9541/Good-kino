import React from 'react';
import { Col, Button, Icon, Rate } from "antd"
import { Link } from "react-router-dom"

import "./movie-page.css"
import VideoPlayer from '../video-player';

const MoviePage = (props) => {
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
    Genre
  } = props.movieDescription;
  const replacedYear = (Year) ? Year.replace(new RegExp("–", "ig"), "") : null

  return (
    <Col span={18}>
      <Col className={"movie-name-and-add-to-favorite-wrap"}>
        <Col className={"movie-name"}>
          <span>{Title}</span>
        </Col>
        <Col className="add-to-favorite">
          <Button>
            <Icon type="heart"></Icon>
          </Button>
        </Col>
      </Col>

      <Col className="movie-description-wrap">
        <Col span={7} className="movie-poster">
          <img src={Poster} alt={"movie poster"} />
        </Col>
        <Col className="movie-description">
          <ul className="description-list">
            <li>
              <b>Рейтинги:</b> imdb: {imdbRating}  <small>({imdbVotes})</small>
            </li>
            <li>
              <b>Год Выпуска:</b> <Link to={`/${Type}/year/${replacedYear}`}>{replacedYear}</Link>
            </li>
            <li>
              <b>Дата выхода:</b> {Released}
            </li>
            <li>
              <b>Страна:</b> {Country}
            </li>
            <li>
              <b>Продолжительность:</b> {Runtime}
            </li>
            <li>
              <b>Жанр:</b> {Genre}
            </li>
            <li>
              <b>Режиссер:</b> {Director}
            </li>
            <li>
              <b>В ролях:</b> {Actors}
            </li>
          </ul>
        </Col>
      </Col>
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
      <Col >
        <VideoPlayer />
      </Col>

    </Col>
  );
}

export default MoviePage