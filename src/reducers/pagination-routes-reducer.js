const initialState = {
  paginationRoutesData: [],
  loading: true,
  error: null
}

const paginationRouteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MOVIE_FOR_PAGINATION_ROUTE_REQUEST":
      return {
        paginationRoutesData: [],
        loading: true,
        error: null,
      }
    case "MOVIE_FOR_PAGINATION_ROUTE_SUCCESS":
      return {
        paginationRoutesData: action.payload,
        loading: false,
        error: null
      }

    case "MOVIE_FOR_PAGINATION_ROUTE_FAILURE":
      return {
        paginationRoutesData: [],
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}

export default paginationRouteReducer;