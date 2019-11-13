/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Spin, Col, Row } from "antd";
import * as movieDataActions from "../actions/movie-data-action";

import PageNotFound from "../components/page-not-found";
import MoviePage from "../components/movie-page";
import MovieComment from "../components/movie-comment";
import MovieItemRender from "../components/movie-item-render";

function decodeUriComponent(str) {
  return decodeURI(str)
    .replace(/\+/g, " ");
}

class MoviePageContainer extends Component {
  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.getData();
    }
  }

  componentWillUnmount() {
    const { fetchMovieDataRequest } = this.props;
    fetchMovieDataRequest("movie-page");
  }

  getData() {
    const reducerName = "movie-page";
    const {
      match,
      fetchingData,
      fetchMovieDataFailure,
      fetchMovieDataRequest,
      fetchMovieDataSuccess
    } = this.props;

    const movie = decodeUriComponent(match.params.movie);

    fetchMovieDataRequest(reducerName);
    fetchingData(movie)
      .then(({ data }) => {
        fetchMovieDataSuccess(data, reducerName);
      })
      .catch(err => fetchMovieDataFailure(err, reducerName));
  }

  render() {
    const { error, loading } = this.props;
    const film = this.props.movie.film || "asd";

    if (loading) {
      return <Spin />;
    }

    if (error) {
      console.log(error)
      return <PageNotFound />;
    }

    return (
      <Col span={18}>
        <MoviePage movieDescription={this.props.movie.film || []} />
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <MovieItemRender signature="Watch more free movies" movies={this.props.movie.similarFilm} />
          </Col>
        </Row>
        <MovieComment movieId={this.props.movie.film._id || []} />
      </Col>
    );
  }
}

const mapStateToProps = state => {
  return {
    movie: state.moviePage.movies,
    loading: state.moviePage.loading,
    error: state.moviePage.error
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...movieDataActions }, dispatch);
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(MoviePageContainer);
