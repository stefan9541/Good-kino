import React from "react";
import { withRouter } from "react-router-dom";

import "./page-not-found.css";


const PageNotFound = props => {
  const onButtonClick = () => {
    const { history } = props;
    history.push("/");
  };

  return (
    <div className="container">
      <div className="error">
        <p className="p">4</p>
        <span className="dracula">
          <div className="con">
            <div className="hair" />
            <div className="hair-r" />
            <div className="head" />
            <div className="eye" />
            <div className="eye eye-r" />
            <div className="mouth" />
            <div className="blod" />
            <div className="blod blod2" />
          </div>
        </span>
        <p className="p">4</p>

        <div className="page-ms">
          <p className="page-msg"> Oops, the page you're looking for Disappeared </p>
          <button type="button" onClick={onButtonClick} className="go-back">Go Home</button>
        </div>
      </div>
    </div>

  );
};

export default withRouter(PageNotFound);
