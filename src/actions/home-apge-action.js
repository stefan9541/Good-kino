export const movieForHomePageRequest = () => {
  return {
    type: "MOVIE_FOR_HOME_PAGE_REQUEST"
  }
}

export const movieForHomePageSuccess = movies => {
  return {
    type: "MOVIE_FOR_HOME_PAGE_SUCCESS",
    payload: movies
  }
}
export const movieForHomePageFailure = err => {
  return {
    type: "MOVIE_FOR_HOME_PAGE_FAILURE",
    payload: err
  }
}