const initialState = {
  leftSidebarItems: [],
  err: null,
}

const leftSidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LEFT_SIDEBAR_REQUEST" :
      return {
        ...state,
        leftSidebarItems: action.payload
      };
    case "LEFT_SIDEBAR_FAILURE":
      return {
        ...state,
        err: action.payload
      }
  
    default:
      return state;
  }
}

export default leftSidebarReducer;