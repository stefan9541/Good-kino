import React, { Component } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import qstr from "query-string";
import { Spin } from "antd";
import { fetchData, fetchMovieDataRequest } from "../actions/movie-data-action";
import MovieItemRender from "../components/movie-item-render";
import ErrorBoundry from "../components/error-boundry";
import ErrorIndicator from "../components/error-indicator";
import PaginationComponent from "../components/pagination";

class PaginationRoutingMoviesContainer extends Component {
  reducerName = "pagination-route";

  componentDidMount() {
    this.gettingData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.gettingData();
    }
  }

  componentWillUnmount() {
    const { fetchMovieDataRequest } = this.props;
    fetchMovieDataRequest(this.reducerName);
  }

  gettingData = () => {
    const { fetchData } = this.props;
    const { location } = this.props;
    const {
      match: { params }
    } = this.props;
    const movieByType = location.pathname.split("/")[1];
    const parseParams = qstr.parse(location.search);
    const sortedBy = parseParams.sortedBy || "imdbRating";

    const dataParams = {
      movieByType,
      sortedBy,
      ...parseParams,
      ...(params || "")
    };

    fetchData(this.reducerName, dataParams);
  };

  render() {
    const { data, loading, error } = this.props;
    const { result = [] } = data;
    const [items, itemCount = null] = result;
    const currentPage = data.currentPage + 1 || null;

    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100%",
            alignItems: "center"
          }}
        >
          <Spin tip="loadig..." />
        </div>
      );
    }
    if (data.length < 1) {
      return (
        <div style={{ color: "white", fontSize: "18px" }}>
          По вашим критерия ничего не найдено Попробуйте выбрать что нибудь
          другое
        </div>
      );
    }

    if (error) {
      return <ErrorIndicator />;
    }

    return (
      <ErrorBoundry>
        <MovieItemRender
          sortedPanel
          movies={items || []}
          signature={data.signature || ""}
        />
        <PaginationComponent current={currentPage} total={itemCount} />
      </ErrorBoundry>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.paginationRoute.movies,
    loading: state.paginationRoute.loading,
    error: state.paginationRoute.error
  };
};

const mapDispatchToProps = (dispatch, { apiCall }) => {
  return bindActionCreators(
    {
      fetchData: fetchData(apiCall),
      fetchMovieDataRequest
    },
    dispatch
  );
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  PaginationRoutingMoviesContainer
);
