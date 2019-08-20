
export const searchInputRequst = () => {
  return {
    type: "ON_SEARCH_INPUT_REQUEST"
  }
};

export const searchInputSuccess = (movies) => {
  return {
    type: "ON_SEARCH_INPUT_SUCCESS",
    payload: movies
  }
};

export const searchInputFailure = (err) => {
  return {
    type: "ON_SEARCH_INPUT_REQUEST_FAILURE",
    payload: err
  }
}

export const searchItemResultVisible = (visible) => {
  return {
    type: "SEARCH_ITEM_RESULT_VISIBLE",
    payload: visible
  }
}