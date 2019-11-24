import React from "react";
import { Button, Slider } from "antd";

import "./video-control-panel.css";

const VideoControlPanel = props => {
  const {
    volumeValue,
    handleVolumeChange,
    volumeIcon,
    handleRewindVideo,
    rewindVideoValue,
    maxDurationVideo,
    toolTipFormat,
    handleOnAfterChange,
    durationVideo,
    currentTimeVideo,
    playPauseIcon,
    tooglePlayVideo,
    volumeToolTip
  } = props;

  return (
    <React.Fragment>
      <div className="play-pause-button">
        <Button onClick={tooglePlayVideo}>
          {playPauseIcon}
        </Button>
      </div>
      <div className="current-time">
        {currentTimeVideo}
      </div>
      <div className="slider-duration">
        <Slider
          onChange={handleRewindVideo}
          value={rewindVideoValue}
          max={maxDurationVideo}
          tipFormatter={toolTipFormat}
          onAfterChange={handleOnAfterChange}
        />
      </div>
      <div className="duration-time">
        {durationVideo}
      </div>
      <div className="volume-icon">
        {volumeIcon}
      </div>
      <div className="volume-slider">
        <Slider
          value={volumeValue}
          tipFormatter={volumeToolTip}
          onChange={handleVolumeChange}
        />
      </div>
    </React.Fragment>
  );
};

export default VideoControlPanel;
