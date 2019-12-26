import React, { Component } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import queryStr from "query-string";
import { Spin } from "antd";
import MovieItemRender from "../components/movie-item-render";
import ErrorIndicator from "../components/error-indicator";
import { fetchData } from "../actions/movie-data-action";

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
    const { location, fetchData } = this.props;
    const parseParams = queryStr.parse(location.search);

    fetchData(this.reducerName, parseParams);
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

const mapDispatchToProps = (dispatch, { apiCall }) => {
  return bindActionCreators(
    {
      fetchData: fetchData(apiCall)
    },
    dispatch
  );
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  FavoriteMoviesContainer
);
