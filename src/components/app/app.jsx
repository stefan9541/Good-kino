import React from "react";
import { Row } from "antd";

import "./app.css";
import "antd/dist/antd.css";

import Header from "../header";
import ScrollUpButtonComponent from "../scroll-up-button";
import MainContentRoutes from "../main-content-routes";

const App = () => {
  return (
    <Row id="container">
      
      <Header />

      <ScrollUpButtonComponent />

      <MainContentRoutes />

    </Row>
  );
};

export default App;
