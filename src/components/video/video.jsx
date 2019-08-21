import React from 'react';


// const videoRef = React.createRef();


const Video = (props) => {
  const {
    getCurrentTime,
    tooglePlayVideo,
    hidePreviousPlayButton,
    onLoadVisibleBlock,
    videoRef
  } = props
  return (
    <div className="video-wrapp">
      <div style={{ display: onLoadVisibleBlock }} className="play-button-wrapp">
        <button onClick={hidePreviousPlayButton}>
          <Icon type="play-circle" />
        </button>
      </div>
      <video onTimeUpdate={getCurrentTime} onClick={tooglePlayVideo} ref={videoRef} >
        <source type="video/mp4" src={'/multimedia/tony-tone.mp4'} />
      </video >
    </div>
  );
}

export default Video;