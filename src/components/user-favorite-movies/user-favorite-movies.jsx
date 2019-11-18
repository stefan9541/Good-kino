import React from "react";
import { Row } from "antd";
import { Switch, Route } from "react-router-dom";
import FavoriteMoviesContainer from "../../containers/favorite-movies-container";

const UserFavoriteMovies = props => {
  return (
    <Row>
      <Switch>
        <Route
          path="/favorite"
          component={FavoriteMoviesContainer}
        />
        <Route
          path="/continue"
          render={(props) => {
            return (
              <span>DOSVIDANIE</span>
            )
          }}
        />
      </Switch>
    </Row>
  );
};

export default UserFavoriteMovies;
