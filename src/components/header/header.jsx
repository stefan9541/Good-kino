import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

import AuthAndProfile from "../auth-and-profile";
import WrappedSearchFormContainer from "../../containers/search-form-container";
import NavigationMenu from "../navigation-menu";

import "./header.css";

const Header = () => {
  return (
    <header>
      <Row id="header-item-wrap">
        <Col className="home-logo" span={7}>
          <Link to="/">
            <img src="/img/logo.png" alt="logo" />
          </Link>
        </Col>
        <Col className="input-search-wrap" span={9}>
          <WrappedSearchFormContainer />
        </Col>
        <Col className="auth-profile-wrap" span={7}>
          <AuthAndProfile />
        </Col>
      </Row>
      <NavigationMenu />
    </header>
  );
};

export default Header;
