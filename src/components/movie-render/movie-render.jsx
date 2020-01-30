import React from "react";
import { Col } from "antd";
import { Link } from "react-router-dom";
import { fixedEncodeURIComponent } from "../../utils/fixed-encode-uri";

import "./movie-render.css";

const imgError = event => {
  event.target.src = "https://ispwp.com/img/image-not-available-big.jpg";
};

const MovieRender = ({ movies }) => {
  return movies.map(({ Poster, Title, Genre, Released, Type, _id }) => {
    const splitGenre = Genre.split(",")[0];
    const titlePath = `/${Type}/${splitGenre}/${Title}`;
    const currentPath = fixedEncodeURIComponent(titlePath);
    return (
      <Col key={_id} className="movie-wrap" span={6}>
        <div className="poster-wrap">
          <Link to={{ pathname: currentPath, state: { _id } }}>
            <img
              onError={imgError}
              src={Poster}
              alt={`${Title} movie poster`}
            />
          </Link>
        </div>

        <div className="title-wrap">
          <Link to={currentPath}>{Title}</Link>
        </div>

        <div className="movie-released-wrap">
          <Link to={`/${Type}`}>{Type}</Link>
          <span>{Released}</span>
        </div>
      </Col>
    );
  });
};

export default MovieRender;
