import React, { Component } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import withGoodKinoService from "../components/hoc";
import * as commentariesAction from "../actions/commentaries-action";

import MovieCommentForm from "../components/movie-comment-form";

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
      saveNickname
    } = this.props;
    if (err) {
      return;
    }

    if (saveNickname) {
      localStorage.setItem("nickname", values.nickname);
    }
    console.log(values, movieId)

    postCommentaries({ ...values, movieId })
      .then(res => {
        addNewCommentar({ ...res.data });
        resetFields("commentText");
        disableSubmitButton(true);
      });
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

  handleSwitchChecked = checked => {
    const { saveNicknameToLocalstorage } = this.props;
    saveNicknameToLocalstorage(checked);
  }

  render() {
    const { visibleSubmit, disableSubmit } = this.props;

    return (
      <MovieCommentForm
        visibleSubmit={visibleSubmit}
        disableSubmit={disableSubmit}
        handleSwitchChecked={this.handleSwitchChecked}
        handleFocus={this.handleFocus}
        handleTextAreaChange={this.handleTextAreaChange}
        handleButtonClick={this.handleButtonClick}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    newCommentar: state.commentariesReducer.newCommentar,
    disableSubmit: state.commentariesReducer.disableSubmitButton,
    visibleSubmit: state.commentariesReducer.visibleSubmitButton,
    saveNickname: state.commentariesReducer.saveNicknameToLocalStorage
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...commentariesAction }, dispatch);
};

export default compose(
  withGoodKinoService(),
  connect(mapStateToProps, mapDispatchToProps)
)(MovieCommentFormContainer);
