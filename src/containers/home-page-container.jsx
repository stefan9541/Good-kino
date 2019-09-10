import React, { Component } from 'react';
import { compose } from "redux"
import { connect } from "react-redux"
import withGoodKinoService from "../components/hoc"
import {
  movieForHomePageRequest,
  movieForHomePageSuccess,
  movieForHomePageFailure
} from "../actions/home-apge-action"
import MovieItemRender from "../components/movie-item-render"

class HomePageContainer extends Component {

  componentDidMount() {
    const { getMovieFromHomePage } = this.props.goodKinoService;
    const { movieForHomePageRequest,
      movieForHomePageSuccess,
      movieForHomePageFailure } = this.props;
    movieForHomePageRequest()
    getMovieFromHomePage()
      .then(res => {
        movieForHomePageSuccess(res.data)
      })
      .catch(err => movieForHomePageFailure(err));
  }

  render() {
    const { homePageData = [] } = this.props;
    const [cartoon = [],
      films = [],
      anime = [],
      series = []] = (homePageData || []).map(({ doc }) => {
        return (doc || []).slice(0, 8).sort(() => .5 - Math.random())
      });

    return (
      <React.Fragment>
        <MovieItemRender movies={cartoon} signature={"Новые Мультфильмы"} watchAll={true} />
        <MovieItemRender movies={films} signature={"Новые Фильмы"} watchAll={true} />
        <MovieItemRender movies={anime} signature={"Новые Аниме"} watchAll={true} />
        <MovieItemRender movies={series} signature={"Новые Сериалы"} watchAll={true} />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  movieForHomePageRequest,
  movieForHomePageSuccess,
  movieForHomePageFailure
}

const mapStateToProps = (state) => {
  return {
    homePageData: state.homePageReducer.homePageData
  }
}

export default compose(
  withGoodKinoService(),
  connect(mapStateToProps, mapDispatchToProps)
)(HomePageContainer)