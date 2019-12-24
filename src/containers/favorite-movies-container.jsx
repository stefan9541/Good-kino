import React, { Component } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import queryStr from "query-string";
import { Spin } from "antd";
import MovieItemRender from "../components/movie-item-render";
import ErrorIndicator from "../components/error-indicator";
import * as movieDataActions from "../actions/movie-data-action";

class FavoriteMoviesContainer extends Component {
  reducerName = "favorite-page";

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.getData();
    }
  }

  getData = () => {
    const {
      fetchMovieDataSuccess,
      fetchMovieDataRequest,
      fetchMovieDataFailure,
      fetchingData,
      location
    } = this.props;
    const parseParams = queryStr.parse(location.search);

    fetchMovieDataRequest(this.reducerName);
    fetchingData(parseParams)
      .then(({ data }) => {
        fetchMovieDataSuccess(data, this.reducerName);
      })
      .catch(err => fetchMovieDataFailure(err, this.reducerName));
  };

  render() {
    const { movies, loading, error } = this.props;
    if (error) {
      return <ErrorIndicator />;
    }

    if (loading) {
      return <Spin />;
    }

    return (
      <MovieItemRender
        movies={movies}
        signature="Избранные фильмы"
        sortedPanel
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.favoritePage.movies,
    loading: state.favoritePage.loading,
    error: state.favoritePage.error
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...movieDataActions }, dispatch);
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  FavoriteMoviesContainer
);
