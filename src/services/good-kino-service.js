import axios from "axios";

export default class GoodKinoService {
  getLinkForLeftSideBar = async () => {
    try {
      return await axios.get("/api/privet")
    } catch (error) {
      throw new Error(`sry bad response ${error}`)
    }
  }

  getMovieFromHomePage = async () => {
    try {
      return await axios.get("/api/home-page")
    } catch (error) {
      throw new Error(`sry bar response plz try again ${error}`)
    }
  }

  getMovieFromRoutingAndPagination = async (routerParams) => {
    try {
      return await axios.get("/api/routing-movies", {
        params: {
          ...routerParams
        }
      })
    } catch (err) {
      throw new Error("tebe pizda bratok")
    }
  };

  postMoviesForInputSearch = async (inputValue) => {
    try {
      return await axios.post("/api/search-form", { value: inputValue });
    } catch (error) {
      return error
    }
  };

  getMoviesForInputSearch = async (inputValue) => {
    try {
      return await axios.get("/api/search-form", { params: { inputValue } });
    } catch (error) {
      return error
    }
  };

  fetchMovieFromFilterPanel = async (values) => {
    try {
      return await axios.get("/api/filter", { params: { ...values } })
    } catch (error) {
      throw new Error("pizdec bratok")
    }
  }

  fetchOneMovie = async (movieName) => {
    try {
      return await axios.get("/api/get-only-one-movie", { params: { movieName } })
    } catch (err) {
      throw err;
    }
  }
}