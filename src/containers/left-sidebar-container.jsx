import React, { Component } from "react";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import { withGoodKinoService } from "../components/hoc";
import LeftSideBarItemRender from "../components/left-sidebar-item";
import ExtendedSampleLeftSidebar from "../components/extended-sample-left-sidebar";
import { fetchSideBaritems } from "../actions/left-side-bar-actions";

class LeftSideBarContainer extends Component {
  componentDidMount() {
    const { fetchSideBaritems } = this.props;
    fetchSideBaritems();
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

const mapDispatchToProps = (dispatch, props) => {
  const { getLinkForLeftSideBar } = props.goodKinoService;
  return bindActionCreators(
    {
      fetchSideBaritems: fetchSideBaritems(getLinkForLeftSideBar)
    },
    dispatch
  );
};

export default compose(
  withGoodKinoService(),
  connect(mapStateToProps, mapDispatchToProps)
)(LeftSideBarContainer);
