import React from "react";
import { Col } from "antd";
import { Link } from "react-router-dom";

import "./movie-type.css";

const MovieType = ({ signature, watchAll, type }) => {
  return (
    <Col className="movie-type-wrap" span={24}>
      <div>
        <span style={{ width: "auto" }}>{signature}</span>
        {watchAll ? (
          <span>
            <Link to={`/${type}`}>Смотреть Все</Link>
          </span>
        ) : null}
      </div>
    </Col>
  );
};

export default MovieType;
