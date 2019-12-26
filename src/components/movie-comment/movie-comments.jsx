import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Col, Spin } from "antd";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withGoodKinoService } from "../hoc";
import {
  handleFetchCommentaries,
  fetchNewCommentaries,
  toogleLikeOrDislike
} from "../../actions/commentaries-action";

import MovieCommentFormContainer from "../../containers/movie-comment-form-container";
import MovieCommentItem from "../movie-comment-item";

import "./movie-comments.css";

class MovieComment extends Component {
  componentDidMount() {
    this.fetchingData();
  }

  componentDidUpdate(prevProps) {
    const movieId = this.props.movie.film._id;
    if (movieId !== prevProps.movie.film._id) {
      this.fetchingData();
    }
  }

  fetchingData = () => {
    const movieId = this.props.movie.film._id;
    const { handleFetchCommentaries } = this.props;
    handleFetchCommentaries(movieId);
  };

  handleFetchNewCommentaries = () => {
    const movieId = this.props.movie.film._id;
    const { fetchNewCommentaries } = this.props;
    fetchNewCommentaries(movieId);
  };

  render() {
    console.log("commentaries");
    const {
      commentaries,
      hasMoreItems,
      movie,
      commentariesCount,
      userId,
      toogleLikeOrDislike
    } = this.props;
    const {
      updateCommentariesLike,
      updateCommentariesDislike
    } = this.props.goodKinoService;
    return (
      <Col id="comment-wrapp">
        <span className="comment-value">
          {`Total comments ${commentariesCount}`}
        </span>

        <MovieCommentFormContainer movieId={movie.film._id} />

        <InfiniteScroll
          pageStart={0}
          loader={<Spin key={1} />}
          loadMore={this.handleFetchNewCommentaries}
          hasMore={hasMoreItems}
        >
          <MovieCommentItem
            updateCommentariesDislike={updateCommentariesDislike}
            updateCommentariesLike={updateCommentariesLike}
            toogleLikeOrDislike={toogleLikeOrDislike}
            userId={userId}
            commentaries={commentaries}
          />
        </InfiniteScroll>
      </Col>
    );
  }
}

const mapStateToProps = state => {
  return {
    commentaries: state.commentariesReducer.commentaries,
    movie: state.moviePage.movies,
    loading: state.commentariesReducer.loading,
    error: state.commentariesReducer.error,
    hasMoreItems: state.commentariesReducer.hasMoreItems,
    pageOfCommentaries: state.commentariesReducer.pageOfCommentaries,
    commentariesCount: state.commentariesReducer.commentariesCount,
    userId: state.userReducer._id
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const { fetchCommentaries } = props.goodKinoService;
  return bindActionCreators(
    {
      handleFetchCommentaries: handleFetchCommentaries(fetchCommentaries),
      fetchNewCommentaries: fetchNewCommentaries(fetchCommentaries),
      toogleLikeOrDislike
    },
    dispatch
  );
};
export default compose(
  withGoodKinoService(),
  connect(mapStateToProps, mapDispatchToProps)
)(MovieComment);
