import React from "react";
import { Col, Icon, Button } from "antd";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import { withGoodKinoService } from "../hoc";
import {
  appendMovieToFavorite,
  excludeMovieFromFavorite
} from "../../actions/user-actions";

import "./movie-name-add-to-favorite.css";

const MovieNameAndAddToFavorite = props => {
  const {
    title,
    favoriteMovies = [],
    movieId,
    appendMovieToFavorite,
    excludeMovieFromFavorite
  } = props;
  const movieIndex = favoriteMovies.indexOf(movieId);
  const isMovieAdded = movieIndex !== -1;

  const handleToggleFavorite = () => {
    if (!favoriteMovies) {
      return;
    }
    if (isMovieAdded) {
      excludeMovieFromFavorite(movieId, movieIndex);
      return;
    }

    appendMovieToFavorite(movieId);
  };

  return (
    <Col className="movie-name-and-add-to-favorite-wrap">
      <Col className="movie-name">
        <span>{title}</span>
      </Col>
      <Col className="add-to-favorite">
        <Button onClick={handleToggleFavorite} className="add-to-favorite-btn">
          {isMovieAdded ? (
            <Icon twoToneColor="#1890ff" type="heart" theme="twoTone" />
          ) : (
            <Icon type="heart" theme="outlined" />
          )}
        </Button>
      </Col>
    </Col>
  );
};

const mapStateToProps = state => {
  return {
    favoriteMovies: state.userReducer.favoriteMovies
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const {
    patchMovieToFavorite,
    removeMovieFromFavorite
  } = props.goodKinoService;

  return bindActionCreators(
    {
      appendMovieToFavorite: appendMovieToFavorite(patchMovieToFavorite),
      excludeMovieFromFavorite: excludeMovieFromFavorite(
        removeMovieFromFavorite
      )
    },
    dispatch
  );
};

export default compose(
  withGoodKinoService(),
  connect(mapStateToProps, mapDispatchToProps)
)(MovieNameAndAddToFavorite);
