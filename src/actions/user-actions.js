export const fetchUserDataRequest = () => {
  return {
    type: "FETCH_USER_DATA_REQUEST"
  };
};

export const fetchUserDataSuccess = user => {
  return {
    type: "FETCH_USER_DATA_SUCCESS",
    payload: user
  };
};
export const fetchUserovieDataFailure = err => {
  return {
    type: "FETCH_USER_DATA_FAILURE",
    payload: err
  };
};
export const addMovieToFavorite = movieId => {
  return {
    type: "ADD_MOVIE_TO_FAVORITE",
    payload: movieId
  };
};
export const removeMovieFromFavoriteAction = movieIndex => {
  return {
    type: "REMOVE_MOVIE_FROM_FAVORITE",
    payload: movieIndex
  };
};
export const addMovieToVoted = (movieId, rate) => {
  return {
    type: "ADD_MOVIE_TO_VOTED",
    payload: {
      movieId,
      rate
    }
  };
};
export const addMovieToContinueWatch = movie => {
  return {
    type: "ADD_MOVIE_TO_CONTINUE_WATCHING",
    payload: movie
  };
};
export const updateMovieStatusToWatched = movieId => {
  return {
    type: "UPDATE_STATUS_MOVIE_TO_WATCHED",
    payload: movieId
  };
};
