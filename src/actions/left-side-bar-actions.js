
const leftSidebarRequest = sideBarItems => {
  return {
    type: "LEFT_SIDEBAR_REQUEST",
    payload: sideBarItems
  };
};

const leftSidebarFilure = err => {
  return {
    type: "LEFT_SIDEBAR_FAILURE",
    payload: err
  };
};

export {
  leftSidebarRequest,
  leftSidebarFilure
};
