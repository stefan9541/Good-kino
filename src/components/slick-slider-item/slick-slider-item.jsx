import React from "react";
import Slider from "react-slick";
import { Row, Col, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { fixedEncodeURIComponent } from "../../utils/fixed-encode-uri";

import "./slick-slider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlickSliderItem = ({ items = [], setting }) => {
  return (
    <Row id="slider-container">
      <Row id="slider">
        <Slider {...setting}>
          {
            (items || []).map(({
              Genre, Type, Title, Poster
            }) => {
              const genre = Genre.split(",")[0];
              const linkHref = `/${Type}/${genre}/${Title}`;
              return (
                <Tooltip mouseEnterDelay={0.3} key={Title} title={Title}>
                  <Col className="slider-item-wrap">
                    <div className="slider-poster-wrap">
                      <Link to={fixedEncodeURIComponent(linkHref)}>
                        <img alt={`${Title} poster img`} src={Poster} />
                      </Link>
                    </div>
                    <div className="slider-title-name-wrap">
                      <Link to={`/${Type}/${genre}/${Title}`}>
                        {Title}
                      </Link>
                    </div>
                  </Col>
                </Tooltip>
              );
            })
          }
        </Slider>
      </Row>
    </Row>
  );
};

export default SlickSliderItem;
