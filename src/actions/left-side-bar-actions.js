const leftSidebarRequest = () => {
  return {
    type: "LEFT_SIDEBAR_REQUEST"
  };
};
const leftSidebarSuccess = sideBarItems => {
  return {
    type: "LEFT_SIDEBAR_SUCCESS",
    payload: sideBarItems
  };
};

const leftSidebarFailure = err => {
  return {
    type: "LEFT_SIDEBAR_FAILURE",
    payload: err
  };
};

export const fetchSideBaritems = apiCall => () => dispatch => {
  dispatch(leftSidebarRequest());
  apiCall()
    .then(({ data }) => dispatch(leftSidebarSuccess(data)))
    .catch(err => dispatch(leftSidebarFailure(err)));
};
