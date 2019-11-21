import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectRoute = ({ isAuth, children, loading }) => {
  if (loading) {
    return null;
  }
  if (isAuth) {
    return children;
  }
  return (
    <Redirect to="/" />
  );
};

const mapStateToProps = state => {
  return {
    isAuth: state.userReducer.isAuth,
    loading: state.userReducer.loading
  };
};

export default connect(mapStateToProps)(ProtectRoute);
