import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import queryStr from "query-string";
import { withGoodKinoService } from "../components/hoc";
import SearchInputResultItem from "../components/search-input-result-item";
import SearchInput from "../components/search-input";

import {
  fetchSearchData,
  searchItemResultVisible
} from "../actions/search-input.action";

class SearchFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
  }

  handleSubmit = (e, err, value) => {
    e.preventDefault();
    const { history, searchItemResultVisible } = this.props;
    const parseParams = queryStr.parse(this.props.location.search);
    if (err) {
      return;
    }
    if (value.length >= 2) {
      searchItemResultVisible(false);
      history.push(`/search?word=${value || parseParams.word}`);
    }
    if (document && document.activeElement) {
      document.activeElement.blur();
    }
  };

  handleMenuClick = () => {
    const { searchItemResultVisible } = this.props;
    searchItemResultVisible(false);
  };

  onInputChange = e => {
    const { fetchSearchData } = this.props;

    const inputValue = e.target.value;
    this.setState({ inputValue });

    fetchSearchData(inputValue);
  };

  onInputFocus = e => {
    const { searchItemResultVisible } = this.props;
    if (e.target.value.length >= 2) {
      searchItemResultVisible(true);
    }
  };

  handleVisibleChange = flag => {
    const { searchItemResultVisible } = this.props;
    searchItemResultVisible(flag);
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
          word={this.state.inputValue}
          handleMenuClick={this.handleMenuClick}
          loading={loading}
          visible={visible}
          handleVisibleChange={this.handleVisibleChange}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchData: state.searchInputReducer.onSearchData,
    visible: state.searchInputReducer.visible,
    loading: state.searchInputReducer.loading
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const { postMoviesForInputSearch } = props.goodKinoService;
  return bindActionCreators(
    {
      fetchSearchData: fetchSearchData(postMoviesForInputSearch),
      searchItemResultVisible
    },
    dispatch
  );
};

export default compose(
  withRouter,
  withGoodKinoService(),
  connect(mapStateToProps, mapDispatchToProps)
)(SearchFormContainer);
