import React from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import MovieItemRender from "../movie-item-render";

const UserFavoriteMovies = props => {
  return (
    <Row>
      <Col span={18}>
        <Switch>
          <Route
            path="/favorite"
            render={(props) => {
              return (
                <span>PRIVET</span>
              )
            }}
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
      </Col>
    </Row>
  );
};

const mapState = state => {
  return {
    movies: state.paginationRoute.movies
  };
};

export default connect(mapState)(UserFavoriteMovies);
