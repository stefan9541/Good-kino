import React, { Component } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withGoodKinoService } from "../components/hoc";
import * as commentariesAction from "../actions/commentaries-action";
import MovieCommentForm from "../components/movie-comment-form";
import NoAccessToComments from "../components/no-access-to-comments";

class MovieCommentFormContainer extends Component {
  componentWillUnmount() {
    const { visibleSubmitButton } = this.props;
    visibleSubmitButton(false);
  }

  handleSubmit = (e, err, values, resetFields) => {
    e.preventDefault();
    const { postCommentaries } = this.props.goodKinoService;
    const {
      addNewCommentar,
      movieId,
      disableSubmitButton,
      _id,
      userName,
      picture
    } = this.props;

    if (err) {
      return;
    }

    const author = {
      _id,
      userName,
      picture
    };
    postCommentaries({ ...values, movieId })
      .then(({ data }) => {
        data.author = author;
        addNewCommentar({ ...data });
        resetFields("commentText");
        disableSubmitButton(true);
      })
      .catch(err => console.log(err));
  };

  handleFocus = () => {
    const { visibleSubmitButton } = this.props;
    visibleSubmitButton(true);
  };

  handleButtonClick = () => {
    const { visibleSubmitButton } = this.props;
    visibleSubmitButton(false);
  };

  handleTextAreaChange = ({ target: { value } }) => {
    const { disableSubmitButton } = this.props;
    if (value.trim().length === 0) {
      disableSubmitButton(true);
    } else {
      disableSubmitButton(false);
    }
  };

  render() {
    const { visibleSubmit, disableSubmit, isAuth } = this.props;

    return isAuth ? (
      <MovieCommentForm
        visibleSubmit={visibleSubmit}
        disableSubmit={disableSubmit}
        handleFocus={this.handleFocus}
        handleTextAreaChange={this.handleTextAreaChange}
        handleButtonClick={this.handleButtonClick}
        handleSubmit={this.handleSubmit}
      />
    ) : (
      <NoAccessToComments />
    );
  }
}

const mapStateToProps = state => {
  return {
    newCommentar: state.commentariesReducer.newCommentar,
    disableSubmit: state.commentariesReducer.disableSubmitButton,
    visibleSubmit: state.commentariesReducer.visibleSubmitButton,
    isAuth: state.userReducer.isAuth,
    userName: state.userReducer.userName,
    _id: state.userReducer._id,
    picture: state.userReducer.picture
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...commentariesAction }, dispatch);
};

export default compose(
  withGoodKinoService(),
  connect(mapStateToProps, mapDispatchToProps)
)(MovieCommentFormContainer);
