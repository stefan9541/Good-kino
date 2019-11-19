import axios from "axios";

axios.defaults.baseURL = (process.env.NODE_ENV === "development")
  ? "http://localhost:8080/api" : "http://localhost:8050";

const { baseURL } = axios.defaults;

export default class GoodKinoService {
  getLinkForLeftSideBar = async () => {
    try {
      return await axios.get(`${baseURL}/siderbar-link`);
    } catch (error) {
      throw new Error(`sry bad response ${error}`);
    }
  }

  getMovieFromHomePage = async () => {
    try {
      return await axios.get(`${baseURL}/home-page`, { withCredentials: true });
    } catch (error) {
      throw new Error(`sry bar response plz try again ${error}`);
    }
  }

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
  }

  fetchOneMovie = movieName => {
    return axios.get(`${baseURL}/get-only-one-movie`, { params: { movieName } });
  }

  fetchVideoForPlayer = async (movieId, quality) => {
    try {
      return await axios.get(`${baseURL}/current-quality`, { params: { movieId, quality } });
    } catch (error) {
      throw new Error("smth wrong bad");
    }
  }

  fetchCommentaries = async (movieId, page) => {
    try {
      return await axios.get(`${baseURL}/get-commentaries`, { params: { movieId, page } });
    } catch (error) {
      throw new Error("smth wrong bad");
    }
  }

  postCommentaries = async commentar => {
    try {
      return await axios.post(`${baseURL}/post-commentaries`, {
        ...commentar,
        body: commentar.commentText,
        author: commentar.author,
        userAvatar: commentar.userAvatar,
        userId: commentar.userId
      });
    } catch (error) {
      throw new Error("smth wrong bad");
    }
  }

  getAuthenticatedUser = () => {
    return axios.get(`${baseURL}/authenticated-user`, { withCredentials: true });
  };

  patchMovieToFavorite = movieId => {
    return axios.patch(`${baseURL}/user/add-favorite-movie`,
      { movieId },
      { withCredentials: true });
  };

  removeMovieFromFavorite = movieId => {
    return axios.patch(`${baseURL}/user/remove-favorite-movie`,
      { movieId },
      { withCredentials: true });
  };

  getFavoriteMovies = params => {
    return axios.get(`${baseURL}/user/get-favorite-movies`,
      { withCredentials: true, params });
  }
}
