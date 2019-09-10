import React, { Component } from 'react';
import { Col, Button, Spin } from "antd";
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

  fetchCommentaries = () => {
    const { fetchCommentaries } = this.props.goodKinoService;
    const {
      movieId,
      fetchCommentariesRequest,
      fetchCommentariesSuccess,
      fetchCommentariesFailure } = this.props;

    fetchCommentariesRequest();
    if (movieId) {
      fetchCommentaries(movieId)
        .then(res => fetchCommentariesSuccess(res.data))
        .catch(err => fetchCommentariesFailure(err));
    }
  }

  componentDidMount() {
    this.fetchCommentaries();
  }


  componentDidUpdate(prevProps) {
    if (this.props.movieId !== prevProps.movieId) {
      this.fetchCommentaries()
    }
  }

  render() {
    const { commentaries } = this.props;
    console.log(commentaries);
    return (
      <Col id="comment-wrapp">
        <span className="comment-value">
          {`Всего комментариев ${commentaries.length}`}
        </span>

        <MovieCommentFormContainer movieId={this.props.movieId} />

        <MovieCommentItem commentaries={commentaries} />

        <Button
          type="primary"
          onClick={() => {
            const { fetchCommentaries } = this.props.goodKinoService;
            const { fetchNewCommentaries } = this.props;
            this.setState({ loading: true });
            fetchCommentaries()
              .then(res => {
                fetchNewCommentaries(res.data);
                this.setState({ loading: false });
              });
          }}
        >
          Click me!
        </Button>
        <br />
        {
          (this.state.loading) ? <Spin style={{ marginBottom: " 100px" }} size="large" /> : null
        }

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