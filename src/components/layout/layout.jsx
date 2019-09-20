import React from "react";
import { Row, Col } from "antd";

import LeftSideBarContainer from "../../containers/left-sidebar-container";

import "./layout.css";

const Layout = props => {
  const { sidebar } = props;

  if (!sidebar) {
    return (
      <Row id="main-content">
        <Col span={24}>
          {props.children}
        </Col>
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
