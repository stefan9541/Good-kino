
export const fetchCommentariesRequest = () => {
  return {
    type: "FETCH_COMMENTARIES_REQUEST"
  };
};

export const fetchCommentariesSuccess = commentaries => {
  return {
    type: "FETCH_COMMENTARIES_SUCCESS",
    payload: commentaries
  };
};

export const fetchCommentariesFailure = err => {
  return {
    type: "FETCH_COMMENTARIES_FAILURE",
    payload: err
  };
};

export const fetchNewCommentaries = newCommentaries => {
  return {
    type: "FETCH_NEW_COMMENTARIES",
    payload: newCommentaries
  };
};

export const addNewCommentar = newCommentar => {
  return {
    type: "ADD_NEW_COMMENTAR",
    payload: newCommentar
  };
};

export const disableSubmitButton = disableButton => {
  return {
    type: "DISABLE_SUBMIT_BUTTON",
    payload: disableButton
  };
};

export const visibleSubmitButton = visibleButton => {
  return {
    type: "VISIBLE_SUBMIT_BUTTON",
    payload: visibleButton
  };
};

export const saveNicknameToLocalstorage = saveNickname => {
  return {
    type: "SAVE_NICKNAME_TO_LOCALSTORAGE",
    payload: saveNickname
  };
};
