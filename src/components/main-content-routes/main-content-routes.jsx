import React from "react";
import { Switch, Route } from "react-router-dom";

import { withGoodKinoService } from "../hoc";
import Layout from "../layout";
import HomePageContainer from "../../containers/home-page-container";
import SlickSLiderContainer from "../../containers/slick-slider-container";
import PaginationRoutingMoviesContainer from "../../containers/pagination-routing-movies-container";
import MoviePageContainer from "../../containers/movie-page-container";
import FavoriteMoviesContainer from "../../containers/favorite-movies-container";
import ContinueWatch from "../continue-watch";
import ProtectRoute from "../protect-route";
import PageNotFound from "../page-not-found";

const MainContentRoutes = props => {
  const {
    fetchMovieFromFilterPanel,
    fetchSingleMovie,
    getMovieFromHomePage,
    getMovieFromRoutingAndPagination,
    getFavoriteMovies
  } = props.goodKinoService;
  return (
    <React.Fragment>
      <Route path="/" exact component={SlickSLiderContainer} />

      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return (
              <Layout sidebar>
                <HomePageContainer apiCall={getMovieFromHomePage} />
              </Layout>
            );
          }}
        />

        {/* routes by type or, type and genre */}
        <Route
          exact
          path="/films/:movieByGenre?"
          render={props => {
            return (
              <Layout sidebar>
                <PaginationRoutingMoviesContainer
                  apiCall={getMovieFromRoutingAndPagination}
                  {...props}
                  sortedPanel
                />
              </Layout>
            );
          }}
        />
        <Route
          exact
          path="/anime/:movieByGenre?"
          render={props => {
            return (
              <Layout sidebar>
                <PaginationRoutingMoviesContainer
                  apiCall={getMovieFromRoutingAndPagination}
                  {...props}
                  sortedPanel
                />
              </Layout>
            );
          }}
        />
        <Route
          exact
          path="/series/:movieByGenre?"
          render={props => {
            return (
              <Layout sidebar>
                <PaginationRoutingMoviesContainer
                  apiCall={getMovieFromRoutingAndPagination}
                  {...props}
                  sortedPanel
                />
              </Layout>
            );
          }}
        />
        <Route
          exact
          path="/cartoon/:movieByGenre?"
          render={props => {
            return (
              <Layout sidebar>
                <PaginationRoutingMoviesContainer
                  apiCall={getMovieFromRoutingAndPagination}
                  {...props}
                  sortedPanel
                />
              </Layout>
            );
          }}
        />

        {/* routint by year */}
        <Route
          exact
          path="/films/year/:yearValue"
          render={props => {
            return (
              <Layout sidebar>
                <PaginationRoutingMoviesContainer
                  apiCall={getMovieFromRoutingAndPagination}
                  {...props}
                  sortedPanel
                />
              </Layout>
            );
          }}
        />
        <Route
          exact
          path="/anime/year/:yearValue"
          render={props => {
            return (
              <Layout sidebar>
                <PaginationRoutingMoviesContainer
                  apiCall={getMovieFromRoutingAndPagination}
                  {...props}
                  sortedPanel
                />
              </Layout>
            );
          }}
        />
        <Route
          exact
          path="/series/year/:yearValue"
          render={props => {
            return (
              <Layout sidebar>
                <PaginationRoutingMoviesContainer
                  apiCall={getMovieFromRoutingAndPagination}
                  {...props}
                  sortedPanel
                />
              </Layout>
            );
          }}
        />
        <Route
          exact
          path="/cartoon/year/:yearValue"
          render={props => {
            return (
              <Layout sidebar>
                <PaginationRoutingMoviesContainer
                  apiCall={getMovieFromRoutingAndPagination}
                  {...props}
                  sortedPanel
                />
              </Layout>
            );
          }}
        />

        {/* routs genre and year */}
        <Route
          exact
          path="/films/:movieByGenre/year/:yearValue"
          render={props => {
            return (
              <Layout sidebar>
                <PaginationRoutingMoviesContainer
                  apiCall={getMovieFromRoutingAndPagination}
                  {...props}
                  sortedPanel
                />
              </Layout>
            );
          }}
        />
        <Route
          exact
          path="/anime/:movieByGenre/year/:yearValue"
          render={props => {
            return (
              <Layout sidebar>
                <PaginationRoutingMoviesContainer
                  apiCall={getMovieFromRoutingAndPagination}
                  {...props}
                  sortedPanel
                />
              </Layout>
            );
          }}
        />
        <Route
          exact
          path="/series/:movieByGenre/year/:yearValue"
          render={props => {
            return (
              <Layout sidebar>
                <PaginationRoutingMoviesContainer
                  apiCall={getMovieFromRoutingAndPagination}
                  {...props}
                  sortedPanel
                />
              </Layout>
            );
          }}
        />
        <Route
          exact
          path="/cartoon/:movieByGenre/year/:yearValue"
          render={props => {
            return (
              <Layout sidebar>
                <PaginationRoutingMoviesContainer
                  apiCall={getMovieFromRoutingAndPagination}
                  {...props}
                  sortedPanel
                />
              </Layout>
            );
          }}
        />

        {/* rout top-100 */}
        <Route
          exact
          path="/top-100/:topType"
          render={props => {
            return (
              <Layout sidebar>
                <PaginationRoutingMoviesContainer
                  apiCall={getMovieFromRoutingAndPagination}
                  {...props}
                  sortedPanel
                />
              </Layout>
            );
          }}
        />

        {/* all input search result */}
        <Route
          exact
          path="/search"
          render={props => {
            return (
              <Layout sidebar>
                <PaginationRoutingMoviesContainer
                  apiCall={getMovieFromRoutingAndPagination}
                  {...props}
                  sortedPanel
                />
              </Layout>
            );
          }}
        />

        {/* query by filters */}
        <Route
          exact
          path="/filter"
          render={props => {
            return (
              <Layout sidebar>
                <PaginationRoutingMoviesContainer
                  {...props}
                  apiCall={fetchMovieFromFilterPanel}
                  sortedPanel
                />
              </Layout>
            );
          }}
        />

        {/* getting one movie */}
        <Route
          exact
          path="/:type/:genre/:movie"
          render={props => {
            return (
              <Layout>
                <MoviePageContainer {...props} apiCall={fetchSingleMovie} />
              </Layout>
            );
          }}
        />

        <Route
          path="/favorite"
          render={props => {
            return (
              <ProtectRoute>
                <Layout rightSidebar>
                  <FavoriteMoviesContainer
                    apiCall={getFavoriteMovies}
                    {...props}
                  />
                </Layout>
              </ProtectRoute>
            );
          }}
        />
        <Route
          path="/continue"
          render={props => {
            return (
              <ProtectRoute>
                <Layout>
                  <ContinueWatch {...props} />
                </Layout>
              </ProtectRoute>
            );
          }}
        />

        <Route
          render={() => {
            return (
              <Layout>
                <PageNotFound />
              </Layout>
            );
          }}
        />
      </Switch>
    </React.Fragment>
  );
};

export default withGoodKinoService()(MainContentRoutes);
