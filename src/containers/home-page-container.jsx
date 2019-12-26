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
    const [anime = [], cartoon = [], films = [], series = []] = (
      homePageData || []
    ).map(({ doc }) => doc.slice(0, 8));

    if (loading) {
      return <Spin />;
    }

    return (
      <React.Fragment>
        <MovieItemRender
          movies={cartoon}
          signature="Новые Мультфильмы"
          watchAll
        />
        <MovieItemRender movies={films} signature="Новые Фильмы" watchAll />
        <MovieItemRender movies={anime} signature="Новые Аниме" watchAll />
        <MovieItemRender movies={series} signature="Новые Сериалы" watchAll />
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
