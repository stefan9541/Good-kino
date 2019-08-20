const initialState = {
  homePageData: [],
  loading: true,
  error: null
}

const homePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MOVIE_FOR_HOME_PAGE_REQUEST":
      return {
        homePageData: [],
        loading: true,
        error: null,
      }
    case "MOVIE_FOR_HOME_PAGE_SUCCESS":
      return {
        homePageData: action.payload,
        loading: false,
        error: null
      }

    case "MOVIE_FOR_HOME_PAGE_FAILURE":
      return {
        homePageData: [],
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}

export default homePageReducer;