/* eslint-disable jsx-a11y/media-has-caption */
import React from "react";
import { Icon } from "antd";

import "./video.css";

class Video extends React.Component {
  render() {
    const {
      getCurrentTime,
      tooglePlayVideo,
      hidePreviousPlayButton,
      onLoadVisibleBlock,
      handleOnEnded,
      innerRef,
      videoPath
    } = this.props;

    return (
      <div className="video-wrapp">
        <div style={{ display: onLoadVisibleBlock }} className="play-button-wrapp">
          <button type="button" onClick={hidePreviousPlayButton}>
            <Icon type="play-circle" />
          </button>
        </div>
        <video
          onTimeUpdate={getCurrentTime}
          onClick={tooglePlayVideo}
          onEnded={handleOnEnded}
          ref={innerRef}
        >
          <source type="video/mp4" src={videoPath} />
        </video>
      </div>
    );
  }
}
// = React.forwardRef((props, ref) =>
export default React.forwardRef((props, ref) => {
  return <Video innerRef={ref} {...props} />;
});
