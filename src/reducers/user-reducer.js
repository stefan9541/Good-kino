const initialState = {
  favoriteMovies: [],
  ratedMovies: [],
  continueWatch: [],
  _id: null,
  googleId: null,
  userName: null,
  picture: null,
  loading: true,
  isAuth: false,
  error: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER_DATA_REQUEST":
      return {
        ...state,
        loading: true,
        isAuth: false,
        error: null
      };
    case "FETCH_USER_DATA_SUCCESS":
      return {
        ...state,
        ...action.payload,
        loading: false,
        isAuth: true
      };

    case "FETCH_USER_DATA_FAILURE":
      return {
        loading: false,
        isAuth: false,
        error: action.payload
      };
    case "ADD_MOVIE_TO_FAVORITE":
      return {
        ...state,
        favoriteMovies: [...state.favoriteMovies, action.payload]
      };
    case "REMOVE_MOVIE_FROM_FAVORITE":
      return {
        ...state,
        favoriteMovies: state.favoriteMovies.filter(
          (e, i) => i !== action.payload
        )
      };
    case "ADD_MOVIE_TO_VOTED":
      return {
        ...state,
        ratedMovies: [...state.ratedMovies, action.payload]
      };
    case "ADD_MOVIE_TO_CONTINUE_WATCHING":
      return {
        ...state,
        continueWatch: [...state.continueWatch, action.payload]
      };
    case "UPDATE_STATUS_MOVIE_TO_WATCHED":
      return {
        ...state,
        continueWatch: state.continueWatch.map(item => {
          if (item.movieId === action.payload.movieId) {
            item.isWatch = action.payload.toggler;
          }
          return item;
        })
      };
    case "DELETE_MOVIE_CONTINUE_WATCH":
      return {
        ...state,
        continueWatch: state.continueWatch.filter(
          item => item.movieId !== action.payload
        )
      };
    default:
      return state;
  }
};

export default userReducer;
