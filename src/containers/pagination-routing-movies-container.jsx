import React, { Component } from 'react';
import { compose, bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as moviesAction from "../actions/pagination-routes-action"
import MovieItemRender from "../components/movie-item-render"
import ErrorBoundry from "../components/error-boundry"
import ErrorIndicator from "../components/error-indicator"
import PaginationComponent from "../components/pagination"
import qstr from "query-string"
import { Spin } from 'antd';


class PaginationRoutingMoviesContainer extends Component {

  gettingData = () => {
    const { fetchingData } = this.props;
    const {
      movieForPaginationRouteFailure,
      movieForPaginationRouteRequest,
      movieForPaginationRouteSuccess
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

    movieForPaginationRouteRequest();

    fetchingData(dataParams)
      .then(res => movieForPaginationRouteSuccess(res.data))
      .catch(err => movieForPaginationRouteFailure(err));
  }

  componentDidMount() {
    this.gettingData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.gettingData()
    }
  }


  render() {
    const { data = [], sortedPanel, loading, error } = this.props;
    const currentPage = (data.currentPage + 1) || null;
    const totalCount = data.count || null;

    if (loading) {
      return (
        <div style={{ display: "flex", justifyContent: "center", height: "100%", alignItems: "center" }}>
          <Spin tip="loadig..." />
        </div>
      )
    }
    if (error) return <ErrorIndicator />

    return (
      <React.Fragment>
        <ErrorBoundry>
          <MovieItemRender sortedPanel={sortedPanel} movies={data.result} signature={`${data.signature || ""}`} />
          {
            (totalCount > 40) ?
              <PaginationComponent
                current={currentPage}
                total={totalCount}
              /> : null
          }
        </ErrorBoundry>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.paginationRouteReducer.paginationRoutesData,
    loading: state.paginationRouteReducer.loading,
    error: state.paginationRouteReducer.error,
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...moviesAction }, dispatch)
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(PaginationRoutingMoviesContainer)