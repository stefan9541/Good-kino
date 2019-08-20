import React, { Component } from "react"
import { withRouter } from "react-router";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import withGoodKinoService from "../components/hoc";
import queryStr from "query-string";
import SearchInputResultItem from "../components/search-input-result-item"
import SearchInput from "../components/search-input"

import * as searchAction from "../actions/search-input.action";
import * as moviesDataAction from "../actions/pagination-routes-action";

// import "./search-input.css"

class SearchFormContainer extends Component {

  handleSubmit = (e, value) => {
    e.preventDefault();
    const { history } = this.props;
    const parseParams = queryStr.parse(this.props.location.search);
    history.push(`/search?word=${value || parseParams.word}`);
  };

  handleMenuClick = () => {
    const { searchItemResultVisible } = this.props
    searchItemResultVisible(false);
  };

  onInputChange = (e) => {
    const { postMoviesForInputSearch } = this.props.goodKinoService;
    const {
      searchInputRequst,
      searchInputSuccess,
      searchInputFailure,
      searchItemResultVisible
    } = this.props;

    const inputValue = e.target.value;

    searchInputRequst();
    if (inputValue.length >= 2) {

      postMoviesForInputSearch(inputValue)
        .then(({ data }) => searchInputSuccess(data))
        .catch(err => searchInputFailure(err));

      searchItemResultVisible(true)
    } else {
      searchItemResultVisible(false)
    }
  };

  onInputFocus = (e) => {
    const { searchItemResultVisible } = this.props;
    if (e.target.value.length >= 2) {
      searchItemResultVisible(true)
    }
  };

  handleVisibleChange = (flag) => {
    const { searchItemResultVisible } = this.props
    searchItemResultVisible(flag)
  };

  render() {
    const { word } = queryStr.parse(this.props.location.search);
    const { visible, searchData, loading } = this.props;
    return (
      <React.Fragment>
        <SearchInput
          defaultValue={word}
          onInputFocus={this.onInputFocus}
          onInputChange={this.onInputChange}
          handleSubmit={this.handleSubmit}
        />
        <SearchInputResultItem
          item={searchData}
          handleMenuClick={this.handleMenuClick}
          loading={loading}
          visible={visible}
          handleVisibleChange={this.handleVisibleChange} />
      </React.Fragment>
    )
  }
};


const mapStateToProps = (state) => {
  return {
    searchData: state.searchInputReducer.onSearchData,
    visible: state.searchInputReducer.visible,
    loading: state.searchInputReducer.loading,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...searchAction, ...moviesDataAction }, dispatch);
};

// const WrappedSearchFormContainer = Form.create({ name: "search-form" })(SearchForm);

export default compose(
  withRouter,
  withGoodKinoService(),
  connect(mapStateToProps, mapDispatchToProps)
)(SearchFormContainer)
