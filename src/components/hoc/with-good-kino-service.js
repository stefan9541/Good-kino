/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import GoodKinoServiceContext from "../good-kino-service-context/good-kino-service-context";

const withGoodKinoService = () => Wrapped => {
  return props => {
    const goodKinoService = useContext(GoodKinoServiceContext);
    return <Wrapped {...props} goodKinoService={goodKinoService} />;
  };
};

export default withGoodKinoService;
