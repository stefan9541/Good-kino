import React, { Component } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import qstr from "query-string";
import { Spin } from "antd";
import * as movieDataActions from "../actions/movie-data-action";
import MovieItemRender from "../components/movie-item-render";
import ErrorBoundry from "../components/error-boundry";
import ErrorIndicator from "../components/error-indicator";
import PaginationComponent from "../components/pagination";


class PaginationRoutingMoviesContainer extends Component {
  componentDidMount() {
    this.gettingData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.gettingData();
    }
  }

  componentWillUnmount() {
    const {
      fetchMovieDataRequest
    } = this.props;
    fetchMovieDataRequest("pagination-route");
  }

  gettingData = () => {
    const reducerName = "pagination-route";
    const { fetchingData } = this.props;
    const {
      fetchMovieDataFailure,
      fetchMovieDataRequest,
      fetchMovieDataSuccess
    } = this.props;
    const { location } = this.props;
    const { match: { params } } = this.props;
    const movieByType = location.pathname.split("/")[1];
    const parseParams = qstr.parse(location.search);
    const sortedBy = parseParams.sortedBy || "imdbRating";

    const dataParams = {
      movieByType,
      sortedBy,
      ...parseParams,
      ...params || ""
    };

    fetchMovieDataRequest(reducerName);

    fetchingData(dataParams)
      .then(res => fetchMovieDataSuccess(res.data, reducerName))
      .catch(err => fetchMovieDataFailure(err, reducerName));
  }


  render() {
    const {
      data,
      sortedPanel,
      loading,
      error
    } = this.props;
    const { result = [] } = data;
    const [items, itemCount = null] = result;
    const currentPage = (data.currentPage + 1) || null;
    console.log(result);
    console.log(items);

    if (loading) {
      return (
        <div style={{
          display: "flex", justifyContent: "center", height: "100%", alignItems: "center"
        }}
        >
          <Spin tip="loadig..." />
        </div>
      );
    }
    if (data.length < 1) {
      return (
        <div style={{ color: "white", fontSize: "18px" }}>
          По вашим критерия ничего не найдено Попробуйте выбрать что нибудь другое
        </div>
      );
    }

    if (error) {
      return <ErrorIndicator />;
    }


    return (
      <ErrorBoundry>
        <MovieItemRender
          sortedPanel={sortedPanel}
          movies={items || []}
          signature={data.signature || ""}
        />
        {
          (itemCount > 40)
            ? (
              <PaginationComponent
                current={currentPage}
                total={itemCount}
              />
            ) : null
        }
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


const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...movieDataActions }, dispatch);
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(PaginationRoutingMoviesContainer);
