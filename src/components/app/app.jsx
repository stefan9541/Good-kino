import React from "react";
import { Row } from "antd";
import "./app.css";
import "antd/dist/antd.css";

import Header from "../header";
import ScrollUpButtonComponent from "../scroll-up-button";
import MainContentRoutes from "../main-content-routes";
import RealTimeNotification from "../../socket-io-connect/io-connect";

const App = () => {
  return (
    <Row id="container">
      <RealTimeNotification />
      <Header />

      <ScrollUpButtonComponent />

      <MainContentRoutes />
    </Row>
  );
};

export default App;
