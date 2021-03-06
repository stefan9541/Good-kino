import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import SlickSliderItem from "../components/slick-slider-item";

class SlickSLiderContainer extends Component {
  setting = {
    infinite: false,
    speed: 1000,
    touchMove: false,
    slidesToShow: 5,
    slidesToScroll: 5
  };

  render() {
    const { sliderItem } = this.props;
    const data = sliderItem.reduce((acc, { doc }) => {
      acc.push(...doc.slice(0, 5));
      return acc;
    }, []);

    return <SlickSliderItem items={data} setting={this.setting} />;
  }
}

const mapStateToProps = state => {
  return {
    sliderItem: state.homePage.movies
  };
};

export default compose(connect(mapStateToProps))(SlickSLiderContainer);
