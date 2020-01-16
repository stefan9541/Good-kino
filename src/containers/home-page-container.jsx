import React, { Component } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Spin } from "antd";
import { fetchData } from "../actions/movie-data-action";

import MovieItemRender from "../components/movie-item-render";

class HomePageContainer extends Component {
  componentDidMount() {
    const reducerName = "home-page";
    const { fetchData } = this.props;
    fetchData(reducerName);
  }

  render() {
    const { homePageData = [], loading } = this.props;
    const data = homePageData.reduce((acc, { _id, doc }) => {
      acc[_id] = { _id, doc: doc.slice(0, 8) };
      return acc;
    }, {});
    const { anime, cartoon, series, films } = data;

    if (loading) {
      return <Spin />;
    }

    return (
      <React.Fragment>
        <MovieItemRender
          movies={cartoon.doc}
          signature="Новые Мультфильмы"
          watchAll
        />
        <MovieItemRender movies={films.doc} signature="Новые Фильмы" watchAll />
        <MovieItemRender movies={anime.doc} signature="Новые Аниме" watchAll />
        <MovieItemRender
          movies={series.doc}
          signature="Новые Сериалы"
          watchAll
        />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch, { apiCall }) => {
  return bindActionCreators(
    {
      fetchData: fetchData(apiCall)
    },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    homePageData: state.homePage.movies,
    loading: state.homePage.loading
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  HomePageContainer
);
