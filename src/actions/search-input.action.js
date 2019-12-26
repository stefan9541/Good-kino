export const searchInputRequst = () => {
  return {
    type: "ON_SEARCH_INPUT_REQUEST"
  };
};

export const searchInputSuccess = movies => {
  return {
    type: "ON_SEARCH_INPUT_SUCCESS",
    payload: movies
  };
};

export const searchInputFailure = err => {
  return {
    type: "ON_SEARCH_INPUT_REQUEST_FAILURE",
    payload: err
  };
};

export const searchItemResultVisible = visible => {
  return {
    type: "SEARCH_ITEM_RESULT_VISIBLE",
    payload: visible
  };
};

export const fetchSearchData = apiCall => value => dispatch => {
  dispatch(searchInputRequst());
  if (value.length >= 2) {
    apiCall(value)
      .then(({ data }) => dispatch(searchInputSuccess(data)))
      .catch(err => dispatch(searchInputFailure(err)));
    dispatch(searchItemResultVisible(true));
  } else {
    dispatch(searchItemResultVisible(false));
  }
};
