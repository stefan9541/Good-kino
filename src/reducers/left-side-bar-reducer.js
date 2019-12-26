const initialState = {
  leftSidebarItems: [],
  err: null
};

const leftSidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LEFT_SIDEBAR_REQUEST":
      return {
        err: null,
        leftSidebarItems: []
      };
    case "LEFT_SIDEBAR_FAILURE":
      return {
        leftSidebarItems: [],
        err: action.payload
      };
    case "LEFT_SIDEBAR_SUCCESS":
      return {
        leftSidebarItems: action.payload,
        err: null
      };

    default:
      return state;
  }
};

export default leftSidebarReducer;
