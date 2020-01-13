import React from "react";
import { Row, Col } from "antd";

import LeftSideBarContainer from "../../containers/left-sidebar-container";
import SortFavoriteByType from "../sort-favorite-by-type";

import "./layout.css";

const Layout = props => {
  const { sidebar, rightSidebar } = props;

  if (rightSidebar) {
    return (
      <Row id="main-content">
        <Col span={18}>{props.children}</Col>
        <Col span={5} offset={1} style={{ color: "red" }}>
          <SortFavoriteByType />
        </Col>
      </Row>
    );
  }

  if (!sidebar) {
    return (
      <Row id="main-content">
        <Col span={24}>{props.children}</Col>
      </Row>
    );
  }

  return (
    <Row id="main-content">
      <Col span={5} id="left-side-bar-container">
        <LeftSideBarContainer />
      </Col>

      <Col id="layout-movies-wrap" span={18} offset={1}>
        {props.children}
      </Col>
    </Row>
  );
};

export default Layout;
