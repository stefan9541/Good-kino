import React, { Component } from "react";
import { Col, Button } from "antd";
import { compose } from "redux";
import { connect } from "react-redux";
import withGoodKinoService from "../hoc";
import {
  fetchCommentariesRequest,
  fetchCommentariesSuccess,
  fetchCommentariesFailure,
  fetchNewCommentaries
} from "../../actions/commentaries-action";

import MovieCommentFormContainer from "../../containers/movie-comment-form-container";
import MovieCommentItem from "../movie-comment-item";

import "./movie-comments.css";

class MovieComment extends Component {
  state = {
    loading: false,
    iconLoading: false,
    commentariesPage: 0
  }

  componentDidMount() {
    this.fetchingData();
    console.log("privet")

  }

  fetchingData = () => {
    const { fetchCommentaries } = this.props.goodKinoService;
    const {
      movieId,
      fetchCommentariesSuccess,
      fetchCommentariesFailure,
      fetchCommentariesRequest
    } = this.props;

    fetchCommentariesRequest();
    fetchCommentaries(movieId)
      .then(res => fetchCommentariesSuccess(res.data))
      .catch(err => fetchCommentariesFailure(err));
  }

  handleFetchNewCommentaries = () => {
    {
      const { fetchCommentaries } = this.props.goodKinoService;
      const { fetchNewCommentaries, movieId } = this.props;
      this.setState({ loading: true });
      fetchCommentaries(movieId)
        .then(res => {
          fetchNewCommentaries(res.data);
          this.setState({ loading: false });
        });
    }
  }

  render() {
    const { commentaries } = this.props;
    return (
      <Col id="comment-wrapp">
        <span className="comment-value">
          {`Total comments ${commentaries.length}`}
        </span>

        <MovieCommentFormContainer movieId={this.props.movieId} />

        <MovieCommentItem commentaries={commentaries} />

        <Button
          type="primary"
          disabled={this.state.loading}
          onClick={this.handleFetchNewCommentaries}
        >
          Load more comments
        </Button>
      </Col>
    );
  }
}

const mapStateToProps = state => {
  return {
    commentaries: state.commentariesReducer.commentaries,
    loading: state.commentariesReducer.loading,
    error: state.commentariesReducer.error
  };
};

const mapDispatchToProps = {
  fetchCommentariesRequest,
  fetchCommentariesSuccess,
  fetchCommentariesFailure,
  fetchNewCommentaries
};
export default compose(
  withGoodKinoService(),
  connect(mapStateToProps, mapDispatchToProps)
)(MovieComment);
