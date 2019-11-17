import React, { Component } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  withGoodKinoService
} from "../components/hoc";
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
      user
    } = this.props;

    if (err) {
      return;
    }

    values.author = {
      userName: user.userName,
      userId: user._id,
      userAvatar: user.picture
    };
    postCommentaries({ ...values, movieId })
      .then(res => {
        addNewCommentar({ ...res.data });
        resetFields("commentText");
        disableSubmitButton(true);
      })
      .catch(err => console.log(err));
  };

  handleFocus = () => {
    const { visibleSubmitButton } = this.props;
    visibleSubmitButton(true);
  }

  handleButtonClick = () => {
    const { visibleSubmitButton } = this.props;
    visibleSubmitButton(false);
  }

  handleTextAreaChange = ({ target: { value } }) => {
    const { disableSubmitButton } = this.props;
    if (value.trim().length === 0) {
      disableSubmitButton(true);
    } else {
      disableSubmitButton(false);
    }
  }

  render() {
    const { visibleSubmit, disableSubmit, user } = this.props;

    return (
      (user)
        ? (
          <MovieCommentForm
            visibleSubmit={visibleSubmit}
            disableSubmit={disableSubmit}
            handleFocus={this.handleFocus}
            handleTextAreaChange={this.handleTextAreaChange}
            handleButtonClick={this.handleButtonClick}
            handleSubmit={this.handleSubmit}
          />
        )
        : <NoAccessToComments />
    );
  }
}

const mapStateToProps = state => {
  return {
    newCommentar: state.commentariesReducer.newCommentar,
    disableSubmit: state.commentariesReducer.disableSubmitButton,
    visibleSubmit: state.commentariesReducer.visibleSubmitButton,
    saveNickname: state.commentariesReducer.saveNicknameToLocalStorage,
    user: state.userReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...commentariesAction }, dispatch);
};

export default compose(
  withGoodKinoService(),
  connect(mapStateToProps, mapDispatchToProps),
)(MovieCommentFormContainer);
