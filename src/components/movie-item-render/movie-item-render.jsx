import React from 'react';
import { Link } from "react-router-dom"
import { Col } from "antd"
import SortedPanelMovies from "../sorted-movies-panel"

import "./movie-item-render.css"

function fixedEncodeURIComponent(str) {
  return encodeURI(str).replace(/%20/g, '+')
}

const MovieItemRender = ({ signature, movies = [], watchAll, sortedPanel }) => {
  return (
    <React.Fragment>
      {
        (sortedPanel) ? <SortedPanelMovies /> : null
      }
      <MovieType signature={signature} watchAll={watchAll} />
      <MovieWrap movies={movies} />
    </React.Fragment>
  );
}
const imgError = (event) => {
  event.target.src = "https://ispwp.com/img/image-not-available-big.jpg"
}

const MovieWrap = ({ movies }) => {
  return (
    (movies || []).map(({ Poster, Title, Genre, Released, Type }, idx) => {
      const splitGenre = Genre.split(",")[0];
      const titlePath = `${Type}/${splitGenre}/${Title}`;
      const currentPath = fixedEncodeURIComponent(titlePath);
      return (
        <Col key={`${Title}+ ${idx}`} className="movie-wrap" span={6}>
          <div className={"poster-wrap"}>
            <Link to={currentPath}>
              <img onError={imgError} src={Poster}  alt={`${Title} movie poster`} />
            </Link>
          </div>

          <div className={"title-wrap"}>
            <Link to={"/pp3"}>
              {Title}
            </Link>
          </div>

          <div className={"movie-released-wrap"}>
            <Link to="/">
              {Type}
            </Link>
            <span>
              {Released}
            </span>
          </div>
        </Col>
      )
    })
  )
}


const MovieType = ({ signature, watchAll }) => {
  return (
    <Col className={"movie-type-wrap"} span={24}>
      <div>
        <span style={{ width: "auto" }}>
          {signature}
        </span>
        {
          (watchAll) ?
            <span>
              <Link to="/">
                Смотреть Все
              </Link>
            </span> : null
        }
      </div>
    </Col >
  )
}

export default MovieItemRender