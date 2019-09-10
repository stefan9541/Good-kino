import React from 'react';
import { Icon } from "antd"


// const videoRef = React.createRef();
import "./video.css"

class Video extends React.Component {

  render() {
    const {
      getCurrentTime,
      tooglePlayVideo,
      hidePreviousPlayButton,
      onLoadVisibleBlock,
      innerRef,
      videoPath,
    } = this.props;

    return (
      <div className="video-wrapp">
        <div style={{ display: onLoadVisibleBlock }} className="play-button-wrapp">
          <button onClick={hidePreviousPlayButton}>
            <Icon type="play-circle" />
          </button>
        </div>
        <video
          onTimeUpdate={getCurrentTime}
          onClick={tooglePlayVideo}
          ref={innerRef} >
          <source type="video/mp4" src={videoPath} />
        </video >
      </div>
    );
  }
}
// = React.forwardRef((props, ref) =>
export default React.forwardRef((props, ref) => {
  return <Video innerRef={ref} {...props} />
});