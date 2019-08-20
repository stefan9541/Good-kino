import React, { Component } from 'react';
import { compose, bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as movieActions from "../actions/pagination-routes-action"

import PageNotFound from "../components/page-not-found"
import MoviePage from "../components/movie-page"
import { Spin } from 'antd';

function decodeUriComponent(str) {
  return decodeURI(str).replace(/\+/g, " ")
}

class MoviePageContainer extends Component {

  componentDidMount() {
    const {
      match,
      fetchingData,
      movieForPaginationRouteFailure,
      movieForPaginationRouteRequest,
      movieForPaginationRouteSuccess } = this.props;

    const movie = decodeUriComponent(match.params.movie)

    movieForPaginationRouteRequest();
    fetchingData(movie)
      .then(({ data }) => movieForPaginationRouteSuccess(data))
      .catch(err => movieForPaginationRouteFailure(err));
  }

  render() {
    const { error, loading } = this.props;

    if (loading) {
      return <Spin />
    }

    if (error) {
      return <PageNotFound />
    }

    console.log(this.props)
    return (
      <MoviePage movieDescription={this.props.movie} />
    );
  }
}

const mapStateToProps = state => {
  return {
    movie: state.paginationRouteReducer.paginationRoutesData,
    loading: state.paginationRouteReducer.loading,
    error: state.paginationRouteReducer.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...movieActions }, dispatch)
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(MoviePageContainer)