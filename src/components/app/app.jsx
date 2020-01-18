import React from "react";
import { Row } from "antd";
import "./app.css";
import "antd/dist/antd.css";

import Header from "../header";
import ScrollUpButtonComponent from "../scroll-up-button";
import MainContentRoutes from "../main-content-routes";
// import { ColorContext } from "../good-kino-service-context";

const App = () => {
  return (
    // <ColorContext.Provider value={{ color: "blue" }}>
    <Row id="container">
      <Header />

      <ScrollUpButtonComponent />

      <MainContentRoutes />
    </Row>
    // </ColorContext.Provider>
  );
};

export default App;
