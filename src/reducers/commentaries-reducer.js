const initialState = {
  commentaries: [],
  newCommentar: {},
  loading: true,
  error: null,
  disableSubmitButton: true,
  visibleSubmitButton: false,
  saveNicknameToLocalStorage: true
};

const commentariesReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case "FETCH_COMMENTARIES_REQUEST":
      return {
        ...state,
        commentaries: [],
        loading: true,
        error: null
      };
    case "FETCH_COMMENTARIES_SUCCESS":
      return {
        ...state,
        commentaries: payload,
        loading: false,
        error: null
      };
    case "FETCH_COMMENTARIES_FAILURE":
      return {
        ...state,
        commentaries: [],
        loading: false,
        error: payload
      };
    case "FETCH_NEW_COMMENTARIES":
      return {
        ...state,
        commentaries: state.commentaries.concat(payload)
      };
    case "ADD_NEW_COMMENTAR":
      return {
        ...state,
        commentaries: [
          payload,
          ...state.commentaries
        ]
      };
    case "DISABLE_SUBMIT_BUTTON":
      return {
        ...state,
        disableSubmitButton: payload
      };
    case "VISIBLE_SUBMIT_BUTTON":
      return {
        ...state,
        visibleSubmitButton: payload
      };
    case "SAVE_NICKNAME_TO_LOCALSTORAGE":
      return {
        ...state,
        saveNicknameToLocalStorage: payload
      };

    default:
      return state;
  }
};

export default commentariesReducer;
