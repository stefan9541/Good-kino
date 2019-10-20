import React, { Component } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Spin } from "antd";
import withGoodKinoService from "../components/hoc";
import * as movieDataActions from "../actions/movie-data-action";

import MovieItemRender from "../components/movie-item-render";

class HomePageContainer extends Component {
  componentDidMount() {
    const reducerName = "home-page";
    const { getMovieFromHomePage } = this.props.goodKinoService;
    const {
      fetchMovieDataRequest,
      fetchMovieDataSuccess,
      fetchMovieDataFailure
    } = this.props;
    fetchMovieDataRequest(reducerName);
    getMovieFromHomePage()
      .then(res => {
        fetchMovieDataSuccess(res.data, reducerName);
      })
      .catch(err => fetchMovieDataFailure(err, reducerName));
  }

  render() {
    const { homePageData = [], loading } = this.props;
    const [
      anime = [],
      cartoon = [],
      films = [],
      series = []] = (homePageData || []).map(({ doc }) => doc.slice(0, 8));

    if (loading) {
      return <Spin />;
    }

    return (
      <React.Fragment>
        <MovieItemRender movies={cartoon} signature="Новые Мультфильмы" watchAll />
        <MovieItemRender movies={films} signature="Новые Фильмы" watchAll />
        <MovieItemRender movies={anime} signature="Новые Аниме" watchAll />
        <MovieItemRender movies={series} signature="Новые Сериалы" watchAll />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...movieDataActions }, dispatch);
};

const mapStateToProps = state => {
  return {
    homePageData: state.homePage.movies,
    loading: state.homePage.loading
  };
};

export default compose(
  withGoodKinoService(),
  connect(mapStateToProps, mapDispatchToProps)
)(HomePageContainer);
