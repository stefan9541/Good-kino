import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withGoodKinoService } from "../components/hoc";
import LeftSideBarItemRender from "../components/left-sidebar-item";
import ExtendedSampleLeftSidebar from "../components/extended-sample-left-sidebar";
import {
  leftSidebarRequest,
  leftSidebarFilure
} from "../actions/left-side-bar-actions";

class LeftSideBarContainer extends Component {
  componentDidMount() {
    const { getLinkForLeftSideBar } = this.props.goodKinoService;
    const { leftSidebarRequest, leftSidebarFilure } = this.props;
    getLinkForLeftSideBar()
      .then(res => {
        leftSidebarRequest(res.data);
      })
      .catch(err => {
        leftSidebarFilure(err);
      });
  }

  render() {
    return (
      <aside>
        <LeftSideBarItemRender sideBarItems={this.props.leftSidebarItems} />
        <ExtendedSampleLeftSidebar />
      </aside>
    );
  }
}

const mapStateToProps = state => {
  return {
    leftSidebarItems: state.leftSidebarReducer.leftSidebarItems,
    error: state.leftSidebarReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    leftSidebarRequest: sidebarItems =>
      dispatch(leftSidebarRequest(sidebarItems)),
    leftSidebarFilure: err => dispatch(leftSidebarFilure(err))
  };
};

export default compose(
  withGoodKinoService(),
  connect(mapStateToProps, mapDispatchToProps)
)(LeftSideBarContainer);
