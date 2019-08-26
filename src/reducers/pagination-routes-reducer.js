const initialState = {
  movies: [],
  loading: true,
  error: null
}

const paginationRouteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_MOVIE_FROM_PAGINATION_ROUTE_REQUEST":
      return {
        movies: [],
        loading: true,
        error: null,
      }
    case "FETCH_MOVIE_FROM_PAGINATION_ROUTE_SUCCESS":
      return {
        movies: action.payload,
        loading: false,
        error: null
      }

    case "FETCH_MOVIE_FROM_PAGINATION_ROUTE_FAILURE":
      return {
        movies: [],
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}

export default paginationRouteReducer;