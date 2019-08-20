import React, { Component } from 'react';
import { compose } from "redux"
import { connect } from "react-redux"
import SlickSliderItem from "../components/slick-slider-item"


class SlickSLiderContainer extends Component {

  setting = {
    infinite: true,
    speed: 2000,
    touchMove: false,
    slidesToShow: 5,
    slidesToScroll: 5
  }

  render() {
    const { sliderItem  } = this.props;
    const [cartoon = [],
      anime = [],
      movies = [],
      series = []] = (sliderItem || []).map(({ doc }) => (doc || []).slice(0, 5));

    const sliderItems = cartoon.concat(anime, movies, series)
      .sort(function () {
        return .5 - Math.random()
      });

    return (
      <SlickSliderItem items={sliderItems} setting={this.setting} />
    );
  }
}


const mapStateToProps = (state) => {
  return {
    sliderItem: state.homePageReducer.homePageData
  }
}


export default compose(
  connect(mapStateToProps)
)(SlickSLiderContainer)