import GoodKinoService from "../services";

const { getMovieFromRoutingAndPagination } = new GoodKinoService();

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

export const fetchData = (params, name) => dispatch => {
  dispatch(fetchMovieDataRequest());
  getMovieFromRoutingAndPagination(params)
    .then(({ data }) => dispatch(fetchMovieDataSuccess(data, name)))
    .catch(err => dispatch(fetchMovieDataFailure(err, name)));
};

export const updateMovieRate = (userRate, name) => {
  return {
    type: "UPDATE_MOVIE_RATE",
    name,
    payload: userRate
  };
};
