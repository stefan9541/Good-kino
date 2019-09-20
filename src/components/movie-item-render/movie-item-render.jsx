import React from "react";
import { Link } from "react-router-dom";
import { Col } from "antd";
import SortedPanelMovies from "../sorted-movies-panel";

import "./movie-item-render.css";

function fixedEncodeURIComponent(str) {
  return encodeURI(str)
    .replace(/%20/g, "+");
}

const imgError = event => {
  event.target.src = "https://ispwp.com/img/image-not-available-big.jpg";
};

const MovieItemRender = ({
  signature, movies = [], watchAll, sortedPanel
}) => {
  const type = (movies[0]) ? movies[0].Type : "";
  return (
    <React.Fragment>
      {
        (sortedPanel) ? <SortedPanelMovies /> : null
      }
      <MovieType type={type} signature={signature} watchAll={watchAll} />
      <MovieRender movies={movies} />
    </React.Fragment>
  );
};


const MovieRender = ({ movies }) => {
  return (
    (movies || []).map(({
      Poster, Title, Genre, Released, Type
    }, idx) => {
      const splitGenre = Genre.split(",")[0];
      const titlePath = `/${Type}/${splitGenre}/${Title}`;
      const currentPath = fixedEncodeURIComponent(titlePath);
      return (
        <Col key={`${Title}+ ${idx}`} className="movie-wrap" span={6}>
          <div className="poster-wrap">
            <Link to={currentPath}>
              <img onError={imgError} src={Poster} alt={`${Title} movie poster`} />
            </Link>
          </div>

          <div className="title-wrap">
            <Link to={currentPath}>
              {Title}
            </Link>
          </div>

          <div className="movie-released-wrap">
            <Link to="/">
              {Type}
            </Link>
            <span>
              {Released}
            </span>
          </div>
        </Col>
      );
    })
  );
};


const MovieType = ({ signature, watchAll, type }) => {
  return (
    <Col className="movie-type-wrap" span={24}>
      <div>
        <span style={{ width: "auto" }}>
          {signature}
        </span>
        {
          (watchAll)
            ? (
              <span>
                <Link to={`/${type}`}>
                  Смотреть Все
                </Link>
              </span>
            ) : null
        }
      </div>
    </Col>
  );
};

export default MovieItemRender;
