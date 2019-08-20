export const movieForPaginationRouteRequest = () => {
  return {
    type: "MOVIE_FOR_PAGINATION_ROUTE_REQUEST"
  }
}

export const movieForPaginationRouteSuccess = movies => {
  return {
    type: "MOVIE_FOR_PAGINATION_ROUTE_SUCCESS",
    payload: movies
  }
}
export const movieForPaginationRouteFailure = err => {
  return {
    type: "MOVIE_FOR_PAGINATION_ROUTE_FAILURE",
    payload: err
  }
}