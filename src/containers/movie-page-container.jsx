/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as movieActions from "../actions/pagination-routes-action";

import { Spin, Col } from 'antd';
import PageNotFound from "../components/page-not-found";
import MoviePage from "../components/movie-page";
import MovieComment from "../components/movie-comment";

function decodeUriComponent(str) {
  return decodeURI(str)
    .replace(/\+/g, " ");
}

class MoviePageContainer extends Component {

  componentDidMount() {
    const {
      match,
      fetchingData,
      movieForPaginationRouteFailure,
      movieForPaginationRouteRequest,
      movieForPaginationRouteSuccess } = this.props;

    const movie = decodeUriComponent(match.params.movie);

    movieForPaginationRouteRequest();
    fetchingData(movie)
      .then(({ data }) => {
        movieForPaginationRouteSuccess(data);
      })
      .catch(err => movieForPaginationRouteFailure(err));
  }
  componentWillUnmount() {
    const { movieForPaginationRouteRequest } = this.props;
    movieForPaginationRouteRequest();
  }

  render() {
    const { error, loading } = this.props;

    if (loading) {
      return <Spin />;
    }

    if (error) {
      return <PageNotFound />;
    }

    return (
      <Col span={18}>
        <MoviePage movieDescription={this.props.movie} />
        <MovieComment movieId={this.props.movie._id} />
      </Col>
    );
  }
}

const mapStateToProps = state => {
  return {
    movie: state.paginationRouteReducer.movies,
    loading: state.paginationRouteReducer.loading,
    error: state.paginationRouteReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...movieActions }, dispatch);
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(MoviePageContainer);