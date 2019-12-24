import React from "react";
import { Col, Icon, Button } from "antd";
import { connect } from "react-redux";
import { compose } from "redux";
import { withGoodKinoService } from "../hoc";
import {
  addMovieToFavorite,
  removeMovieFromFavoriteAction
} from "../../actions/user-actions";

import { successMessage, errorMessage } from "../../utils/feed-back";

import "./movie-name-add-to-favorite.css";

const MovieNameAndAddToFavorite = props => {
  const {
    patchMovieToFavorite,
    removeMovieFromFavorite
  } = props.goodKinoService;
  const {
    title,
    favoriteMovies = [],
    movieId,
    addMovieToFavorite,
    removeMovieFromFavoriteAction
  } = props;
  const movieIndex = favoriteMovies.indexOf(movieId);
  const isMovieAdded = movieIndex !== -1;

  const handleAddToFavorite = () => {
    if (!favoriteMovies) {
      return;
    }
    if (isMovieAdded) {
      removeMovieFromFavorite(movieId)
        .then(() => {
          removeMovieFromFavoriteAction(movieIndex);
          successMessage("Успешно удалено из закладок");
        })
        .catch(() =>
          errorMessage("Доступно только для авторизованных пользователей")
        );
      return;
    }

    patchMovieToFavorite(movieId)
      .then(() => {
        addMovieToFavorite(movieId);
        successMessage("Успешно добавлено в закладки");
      })
      .catch(() =>
        errorMessage("Доступно только для авторизованных пользователей")
      );
  };

  return (
    <Col className="movie-name-and-add-to-favorite-wrap">
      <Col className="movie-name">
        <span>{title}</span>
      </Col>
      <Col className="add-to-favorite">
        <Button onClick={handleAddToFavorite} className="add-to-favorite-btn">
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

const mapDispatchToProps = {
  removeMovieFromFavoriteAction,
  addMovieToFavorite
};

export default compose(
  withGoodKinoService(),
  connect(mapStateToProps, mapDispatchToProps)
)(MovieNameAndAddToFavorite);
