export const fetchMovieDataRequest = name => {
  return {
    name,
    type: "FETCH_MOVIE_DATA_REQUEST"
  };
};

export const fetchMovieDataSuccess = (movies, name) => {
  return {
    type: "FETCH_MOVIE_DATA_SUCCESS",
    payload: movies,
    name
  };
};
export const fetchMovieDataFailure = (err, name) => {
  return {
    name,
    type: "FETCH_MOVIE_DATA_FAILURE",
    payload: err
  };
};
