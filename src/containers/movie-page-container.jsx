/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Spin, Col, Row } from "antd";
import { fetchData, fetchMovieDataRequest } from "../actions/movie-data-action";

import PageNotFound from "../components/page-not-found";
import MoviePage from "../components/movie-page";
import MovieComment from "../components/movie-comment";
import MovieItemRender from "../components/movie-item-render";

function decodeUriComponent(str) {
  return decodeURI(str).replace(/\+/g, " ");
}

class MoviePageContainer extends Component {
  reducerName = "movie-page";

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
    fetchMovieDataRequest(this.reducerName);
  }

  getData() {
    const {
      fetchData,
      location: { state }
    } = this.props;

    const movieId = state._id;
    fetchData(this.reducerName, movieId);
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
        <MoviePage movieDescription={this.props.movie.film || []} />
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <MovieItemRender
              signature="Watch more free movies"
              movies={this.props.movie.similarFilm}
            />
          </Col>
        </Row>
        <MovieComment />
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

const mapDispatchToProps = (dispatch, { apiCall }) => {
  return bindActionCreators(
    {
      fetchData: fetchData(apiCall),
      fetchMovieDataRequest
    },
    dispatch
  );
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  MoviePageContainer
);
