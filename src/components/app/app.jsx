import React from "react";
import { Row } from "antd";
import "./app.css";
import "antd/dist/antd.css";
// import { Link } from "react-router-dom";
// import axios from "axios";

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
