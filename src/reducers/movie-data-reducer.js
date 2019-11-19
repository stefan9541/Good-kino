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
    case "UPDATE_MOVIE_RATE":
      return {
        ...state,
        movies: {
          ...state.movies,
          film: {
            ...state.movies.film,
            totalUsersRate: state.movies.film.totalUsersRate + action.payload,
            totalUsersVotes: state.movies.film.totalUsersVotes + 1
          }
        }
      };
    default:
      return state;
  }
};

export default movieDataReducer;
