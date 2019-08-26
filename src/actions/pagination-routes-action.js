export const movieForPaginationRouteRequest = () => {
  return {
    type: "FETCH_MOVIE_FROM_PAGINATION_ROUTE_REQUEST"
  }
}

export const movieForPaginationRouteSuccess = movies => {
  return {
    type: "FETCH_MOVIE_FROM_PAGINATION_ROUTE_SUCCESS",
    payload: movies
  }
}
export const movieForPaginationRouteFailure = err => {
  return {
    type: "FETCH_MOVIE_FROM_PAGINATION_ROUTE_FAILURE",
    payload: err
  }
}