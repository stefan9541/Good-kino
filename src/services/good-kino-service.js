/* eslint-disable operator-linebreak */
import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/api"
    : "https://good-kino.herokuapp.com/api";

const { baseURL } = axios.defaults;

export default class GoodKinoService {
  getLinkForLeftSideBar = async () => {
    try {
      return await axios.get(`${baseURL}/siderbar-link`);
    } catch (error) {
      throw new Error(`sry bad response ${error}`);
    }
  };

  getMovieFromHomePage = async () => {
    try {
      return await axios.get(`${baseURL}/home-page`);
    } catch (error) {
      throw new Error(`sry bar response plz try again ${error}`);
    }
  };

  getMovieFromRoutingAndPagination = async routerParams => {
    try {
      return await axios.get(`${baseURL}/routing-movies`, {
        params: {
          ...routerParams
        }
      });
    } catch (err) {
      throw new Error(`sry bar response plz try again ${err}`);
    }
  };

  postMoviesForInputSearch = async inputValue => {
    try {
      return await axios.post(`${baseURL}/search-form`, { value: inputValue });
    } catch (error) {
      return error;
    }
  };

  fetchMovieFromFilterPanel = async values => {
    try {
      return await axios.get(`${baseURL}/filter`, { params: { ...values } });
    } catch (error) {
      throw new Error(`sry bar response plz try again ${error}`);
    }
  };

  fetchSingleMovie = movieName => {
    return axios.get(`${baseURL}/get-only-one-movie`, {
      params: { movieName }
    });
  };

  fetchVideoForPlayer = async (movieId, quality) => {
    try {
      return await axios.get(`${baseURL}/current-quality`, {
        params: { movieId, quality }
      });
    } catch (error) {
      throw new Error("smth wrong bad");
    }
  };

  fetchCommentaries = async (movieId, page = 0) => {
    try {
      return await axios.get(`${baseURL}/get-commentaries`, {
        params: { movieId, page }
      });
    } catch (error) {
      throw new Error("smth wrong bad");
    }
  };

  postNewCommentaries = async commentar => {
    try {
      return await axios.post(
        `${baseURL}/post-commentaries`,
        { ...commentar },
        { withCredentials: true }
      );
    } catch (error) {
      throw new Error("smth wrong bad");
    }
  };

  getAuthenticatedUser = () => {
    return axios.get(`${baseURL}/authenticated-user`, {
      withCredentials: true
    });
  };

  patchMovieToFavorite = movieId => {
    return axios.patch(
      `${baseURL}/user/add-favorite-movie`,
      { movieId },
      { withCredentials: true }
    );
  };

  removeMovieFromFavorite = movieId => {
    return axios.patch(
      `${baseURL}/user/remove-favorite-movie`,
      { movieId },
      { withCredentials: true }
    );
  };

  getFavoriteMovies = params => {
    return axios.get(`${baseURL}/user/get-favorite-movies`, {
      withCredentials: true,
      params
    });
  };

  fetchUpdateMovieRate = (value, movieId) => {
    return axios.patch(
      `${baseURL}/user/update-rate-movie`,
      { value, movieId },
      { withCredentials: true }
    );
  };

  updateContinueMovieUserCollection = params => {
    return axios.post(
      `${baseURL}/user/continue-watch-movie`,
      { ...params },
      { withCredentials: true }
    );
  };

  registerNewUser = params => {
    return axios.post(
      `${baseURL}/register`,
      { ...params },
      { withCredentials: true }
    );
  };

  logInUser = params => {
    return axios.post(
      `${baseURL}/login`,
      { ...params },
      { withCredentials: true }
    );
  };

  updateCommentariesLike = (commentariesId, isLiked) => {
    return axios.patch(
      `${baseURL}/commentaries/update/likes`,
      { commentariesId, isLiked },
      { withCredentials: true }
    );
  };

  updateCommentariesDislike = (commentariesId, isDislike) => {
    return axios.patch(
      `${baseURL}/commentaries/update/dislikes`,
      { commentariesId, isDislike },
      { withCredentials: true }
    );
  };

  fetchToggleWatchStatus = (movieId, toggler) => {
    return axios.patch(
      `${baseURL}/user/continue-watch-movie/update`,
      { movieId, toggler },
      { withCredentials: true }
    );
  };

  deleteMovieFromContinueWatch = movieId => {
    return axios.delete(`${baseURL}/user/continue-watch-movie/delete`, {
      withCredentials: true,
      params: { movieId }
    });
  };

  updateUserAvatar = file => {
    return axios.post(`${baseURL}/user/update/avatar`, file, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  };

  changeUsernameQuery = username => {
    return axios.patch(
      `${baseURL}/user/update/username`,
      { username },
      { withCredentials: true }
    );
  };
}
