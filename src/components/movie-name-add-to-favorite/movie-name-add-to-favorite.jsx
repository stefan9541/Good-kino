import React from "react";
import { Col, Icon, Button } from "antd";

import "./movie-name-add-to-favorite.css";

const MovieNameAndAddToFavorite = ({ title }) => {
  return (
    <Col className="movie-name-and-add-to-favorite-wrap">
      <Col className="movie-name">
        <span>{title}</span>
      </Col>
      <Col className="add-to-favorite">
        <Button>
          <Icon type="heart" />
        </Button>
      </Col>
    </Col>
  );
};

export default MovieNameAndAddToFavorite;
