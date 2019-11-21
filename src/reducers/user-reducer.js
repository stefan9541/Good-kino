const initialState = {
  user: null,
  loading: true,
  isAuth: false,
  error: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER_DATA_REQUEST":
      return {
        ...state,
        user: null,
        loading: true,
        isAuth: false,
        error: null
      };
    case "FETCH_USER_DATA_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
        isAuth: true,
        error: null
      };

    case "FETCH_USER_DATA_FAILURE":
      return {
        user: null,
        loading: false,
        isAuth: false,
        error: action.payload
      };
    case "ADD_MOVIE_TO_FAVORITE":
      return {
        ...state,
        user: {
          ...state.user,
          favoriteMovies: [
            ...state.user.favoriteMovies,
            action.payload
          ]
        }
      };
    case "REMOVE_MOVIE_FROM_FAVORITE":
      return {
        ...state,
        user: {
          ...state.user,
          favoriteMovies: [
            state.user.favoriteMovies.filter((e, i) => i !== action.payload)
          ]
        }
      };
    case "ADD_MOVIE_TO_VOTED":
      return {
        ...state,
        user: {
          ...state.user,
          ratedMovies: [
            ...state.user.ratedMovies,
            action.payload
          ]
        }
      };
    case "ADD_MOVIE_TO_CONTINUE_WATCHING":
      return {
        ...state,
        user: {
          ...state.user,
          continueWatch: [
            ...state.user.continueWatch,
            action.payload
          ]
        }
      };
    default:
      return state;
  }
};

export default userReducer;
