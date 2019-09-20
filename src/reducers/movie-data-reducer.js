const initialState = {
  movies: [],
  loading: true,
  error: null
};

const movieDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_MOVIE_DATA_REQUEST":
      return {
        movies: [],
        loading: true,
        error: null
      };
    case "FETCH_MOVIE_DATA_SUCCESS":
      return {
        movies: action.payload,
        loading: false,
        error: null
      };

    case "FETCH_MOVIE_DATA_FAILURE":
      return {
        movies: [],
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default movieDataReducer;
