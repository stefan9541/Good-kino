/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { GoodKinoServiceConsumer } from "../good-kino-service-context";

const withGoodKinoService = () => Wrapped => {
  return props => {
    return (
      <GoodKinoServiceConsumer>
        {
          goodKinoService => {
            return (
              <Wrapped {...props} goodKinoService={goodKinoService} />
            );
          }
        }
      </GoodKinoServiceConsumer>
    );
  };
};

export default withGoodKinoService;
