import { batch } from "react-redux";

const fetchCommentariesRequest = () => {
  return {
    type: "FETCH_COMMENTARIES_REQUEST"
  };
};
const fetchCommentariesSuccess = commentaries => {
  return {
    type: "FETCH_COMMENTARIES_SUCCESS",
    payload: commentaries
  };
};
const fetchCommentariesFailure = err => {
  return {
    type: "FETCH_COMMENTARIES_FAILURE",
    payload: err
  };
};

const fetchNewItemIfNeeded = hasMoreItems => {
  return {
    type: "FETCH_NEW_ITEM_IF_NEEDED",
    payload: hasMoreItems
  };
};

const pageOfCommentaries = () => {
  return {
    type: "PAGE_OF_COMMENTARIES"
  };
};
const commentariesCount = count => {
  return {
    type: "COMMENTARIES_COUNT",
    payload: count
  };
};
const incCommentariesCount = () => {
  return {
    type: "INC_COMMENTARIES_COUNT"
  };
};

export const handleFetchCommentaries = apiCall => movieId => dispatch => {
  dispatch(fetchCommentariesRequest());
  apiCall(movieId)
    .then(({ data }) => {
      const { commentsResponse, countResponse } = data;
      if (commentsResponse.length < 40) {
        dispatch(fetchNewItemIfNeeded(false));
      } else {
        dispatch(pageOfCommentaries());
      }
      batch(() => {
        dispatch(fetchCommentariesSuccess(commentsResponse));
        dispatch(commentariesCount(countResponse));
      });
    })
    .catch(err => dispatch(fetchCommentariesFailure(err)));
};

export const concatNewCommentaries = newCommentaries => {
  return {
    type: "CONCAT_NEW_COMMENTARIES",
    payload: newCommentaries
  };
};

export const fetchNewCommentaries = apiCall => {
  return movieId => {
    return (dispatch, getState) => {
      const { commentariesReducer } = getState();
      const {
        commentaries,
        hasMoreItems,
        page,
        commentariesCount
      } = commentariesReducer;
      if (!hasMoreItems) {
        return;
      }
      if (commentaries.length === commentariesCount) {
        dispatch(fetchNewItemIfNeeded(false));
        return undefined;
      }
      apiCall(movieId, page)
        .then(({ data }) => {
          const { commentsResponse } = data;
          batch(() => {
            dispatch(concatNewCommentaries(commentsResponse));
            dispatch(pageOfCommentaries());
          });
        })
        .catch(err => dispatch(fetchCommentariesFailure(err)));
    };
  };
};

export const newCommentar = newCommentar => {
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

export const handleAddNewCommentar = apiCall => {
  return (movieId, values, resetFields) => {
    return (dispatch, getState) => {
      const { userReducer } = getState();
      const { userName, _id, picture } = userReducer;
      const author = {
        _id,
        userName,
        picture
      };
      apiCall({ ...values, movieId })
        .then(({ data }) => {
          data.author = author;
          resetFields("commentText");
          batch(() => {
            dispatch(newCommentar({ ...data }));
            dispatch(incCommentariesCount());
            dispatch(disableSubmitButton(true));
          });
        })
        .catch(err => console.error(err));
    };
  };
};

export const toogleLikeOrDislike = (toogle, userId, commentId) => {
  return {
    type: "TOOGLE_LIKE_OR_DISLIKE",
    payload: { toogle, userId, commentId }
  };
};
