import React from 'react';
import {Icon} from "antd"


// const videoRef = React.createRef();
import "./video.css"

const Video = React.forwardRef((props, ref) => {
  const {
    getCurrentTime,
    tooglePlayVideo,
    hidePreviousPlayButton,
    onLoadVisibleBlock,
  } = props
  return (
    <div className="video-wrapp">
      <div style={{ display: onLoadVisibleBlock }} className="play-button-wrapp">
        <button onClick={hidePreviousPlayButton}>
          <Icon type="play-circle" />
        </button>
      </div>
      <video onTimeUpdate={getCurrentTime} onClick={tooglePlayVideo} ref={ref} >
        <source type="video/mp4" src={'/multimedia/tony-tone.mp4'} />
      </video >
    </div>
  );
})

export default Video;