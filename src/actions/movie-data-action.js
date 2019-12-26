export const fetchMovieDataRequest = name => {
  return {
    name,
    type: "FETCH_MOVIE_DATA_REQUEST"
  };
};
export const fetchMovieDataSuccess = (name, movies) => {
  return {
    type: "FETCH_MOVIE_DATA_SUCCESS",
    payload: movies,
    name
  };
};
export const fetchMovieDataFailure = (name, err) => {
  return {
    name,
    type: "FETCH_MOVIE_DATA_FAILURE",
    payload: err
  };
};

export const fetchData = apiCall => (name, params) => dispatch => {
  dispatch(fetchMovieDataRequest(name));
  apiCall(params)
    .then(({ data }) => dispatch(fetchMovieDataSuccess(name, data)))
    .catch(err => dispatch(fetchMovieDataFailure(name, err)));
};

export const updateMovieRate = userRate => {
  return {
    type: "UPDATE_MOVIE_RATE",
    name: "movie-page",
    payload: userRate
  };
};
