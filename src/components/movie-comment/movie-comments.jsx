import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Col, Button, Spin } from "antd";
import { compose } from "redux";
import { connect } from "react-redux";
import { withGoodKinoService } from "../hoc";
import {
  fetchCommentariesRequest,
  fetchCommentariesSuccess,
  fetchCommentariesFailure,
  fetchNewCommentaries,
  toogleLikeOrDislike
} from "../../actions/commentaries-action";

import MovieCommentFormContainer from "../../containers/movie-comment-form-container";
import MovieCommentItem from "../movie-comment-item";

import "./movie-comments.css";

class MovieComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasMoreItems: true,
      page: 0
    };
  }

  componentDidMount() {
    this.fetchingData();
  }

  fetchingData = () => {
    const { fetchCommentaries } = this.props.goodKinoService;
    const {
      movie: {
        film: { _id }
      },
      fetchCommentariesSuccess,
      fetchCommentariesFailure,
      fetchCommentariesRequest
    } = this.props;

    fetchCommentariesRequest();
    fetchCommentaries(_id)
      .then(({ data }) => {
        if (data.commentsResponse.length < 40) {
          this.setState({ hasMoreItems: false });
        } else {
          this.setState(state => ({ page: state.page + 1 }));
        }
        fetchCommentariesSuccess(data.commentsResponse);
      })
      .catch(err => fetchCommentariesFailure(err));
  };

  handleFetchNewCommentaries = () => {
    const { page, hasMoreItems } = this.state;
    const { fetchCommentaries } = this.props.goodKinoService;
    const {
      fetchNewCommentaries,
      commentaries,
      movie: {
        film: { _id }
      }
    } = this.props;

    if (!hasMoreItems) {
      return;
    }

    fetchCommentaries(_id, page)
      .then(({ data }) => {
        const { commentsResponse, countResponse } = data;

        if (commentaries.length === countResponse) {
          this.setState({ hasMoreItems: false });
          return undefined;
        }
        fetchNewCommentaries(commentsResponse);
        this.setState(state => {
          return {
            page: state.page + 1
          };
        });
      })
      .catch(err => fetchCommentariesFailure(err));
  };

  render() {
    const { hasMoreItems } = this.state;
    const { commentaries, movie, userId, toogleLikeOrDislike } = this.props;
    const {
      updateCommentariesLike,
      updateCommentariesDislike
    } = this.props.goodKinoService;
    return (
      <Col id="comment-wrapp">
        <span className="comment-value">
          {`Total comments ${commentaries.length}`}
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
    userId: state.userReducer._id
  };
};

const mapDispatchToProps = {
  fetchCommentariesRequest,
  fetchCommentariesSuccess,
  fetchCommentariesFailure,
  fetchNewCommentaries,
  toogleLikeOrDislike
};
export default compose(
  withGoodKinoService(),
  connect(mapStateToProps, mapDispatchToProps)
)(MovieComment);
