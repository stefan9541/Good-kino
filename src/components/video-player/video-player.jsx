import React, { Component } from 'react';
import { Icon, Menu } from 'antd';
import Video from "../video"
import VideoControlPanel from '../video-control-panel';

import "./video-player.css"

// const = React.createRef()
const customRef = React.createRef();
const videoRef = React.createRef();

class VideoPlayer extends Component {

  state = {
    tooglePlay: false,
    toogleQualityMenu: false,
    visiblePlayButton: true,
    duration: 0,
    currentTime: 0,
    volume: 50
  }

  formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    let minuteValue;
    let secondValue;

    if (minutes < 10) {
      minuteValue = '0' + minutes;
    } else {
      minuteValue = minutes;
    }

    if (seconds < 10) {
      secondValue = '0' + seconds;
    } else {
      secondValue = seconds;
    }

    return (hours > 0) ?
      hours + ":" + minuteValue + ':' + secondValue
      : minuteValue + ':' + secondValue;
  }

  toolTipFormat = (value) => {
    const { duration } = this.state;
    const toolTipFormat = `${this.formatTime(value)} : ${this.formatTime(duration)}`
    return toolTipFormat
  }

  rewindVideo = (value) => {
    videoRef.current.pause();
    this.setState({ currentTime: Math.floor(value), toogleQualityMenu: false })
  }

  handleAfterChange = (value) => {
    videoRef.current.currentTime = Math.floor(value);
    videoRef.current.play()
  }

  tooglePlayVideo = () => {
    if (videoRef.current.paused) {
      this.setState({ tooglePlay: true, toogleQualityMenu: false })
      videoRef.current.play()
    } else {
      this.setState({ tooglePlay: false, toogleQualityMenu: false });
      videoRef.current.pause();
    }
  }

  hidePreviousPlayButton = () => {
    const duration = Math.floor(videoRef.current.duration);
    this.setState({
      visiblePlayButton: false,
      tooglePlay: true,
      toogleQualityMenu: false,
      duration
    })
    videoRef.current.play()
  }

  handleVolumeChange = (value) => {
    this.setState({ volume: value, toogleQualityMenu: false })
    videoRef.current.volume = value / 100;
  }
  
  volumeToolTip = (value) => {
    return `${value}%`
  }

  fullScreenMode = () => {
    const videoCurrent = customRef.current;
    this.setState({ toogleQualityMenu: false })

    if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
      if (videoCurrent.requestFullscreen) {
        videoCurrent.requestFullscreen();
      } else if (videoCurrent.msRequestFullscreen) {
        videoCurrent.msRequestFullscreen();
      } else if (videoCurrent.mozRequestFullScreen) {
        videoCurrent.mozRequestFullScreen();
      } else if (videoCurrent.webkitRequestFullscreen) {
        videoCurrent.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  getCurrentTime = () => {
    this.setState({ currentTime: Math.floor(videoRef.current.currentTime) })
  }

  toogleQualityMenu = () => {
    this.setState({ toogleQualityMenu: !this.state.toogleQualityMenu })
  }

  render() {
    const { tooglePlay,
      visiblePlayButton,
      toogleQualityMenu,
      currentTime,
      duration,
      volume } = this.state;
    const volumeIcon = (volume === 0)
      ? <i><img src="/svg-icon/123.svg" alt="" /></i>
      : <Icon type="sound" theme="filled" />;
    const playPauseIcon = (tooglePlay)
      ? <Icon type="pause-circle" />
      : <Icon type="play-circle" theme="filled" />;
    const onLoadVisibleBlock = (visiblePlayButton) ? "block" : "none";
    const visibleQualityMenu = (toogleQualityMenu) ? "block" : "none";
    const durationFormat = this.formatTime(duration);
    const currentTimeFormat = this.formatTime(currentTime);
    return (
      <React.Fragment>
        <div ref={customRef} className="custom-video-player-wrapp">
          <Video
            ref={videoRef}
            getCurrentTime={this.getCurrentTime}
            tooglePlayVideo={this.tooglePlayVideo}
            hidePreviousPlayButton={this.hidePreviousPlayButton}
            onLoadVisibleBlock={onLoadVisibleBlock}
          />

          <div className="custom-control-panel-wrap">
            <div className="custom-controls">
              <VideoControlPanel
                // volume slider
                volumeValue={volume}
                volumeToolTip={this.volumeToolTip}
                handleVolumeChange={this.handleVolumeChange}
                volumeIcon={volumeIcon}
                // video slider
                handleRewindVideo={this.rewindVideo}
                rewindVideoValue={this.state.currentTime}
                maxDurationVideo={this.state.duration}
                toolTipFormat={this.toolTipFormat}
                handleOnAfterChange={this.handleAfterChange}
                // other text value
                durationVideo={durationFormat}
                currentTimeVideo={currentTimeFormat}
                playPauseIcon={playPauseIcon}
                // play pause button
                tooglePlayVideo={this.tooglePlayVideo}
              />

              <div onClick={this.toogleQualityMenu} className="quality-change">
                <div style={{ display: visibleQualityMenu }} className="overlay-qality">
                  {menu}
                </div>
                <Icon type="setting" />
              </div>

              <div onClick={this.fullScreenMode} className="fullscreen-button">
                <Icon type="fullscreen" />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const menu = (
  <Menu onClick={(item) => console.log(item)}>
    <Menu.Item key="0">
      480p
    </Menu.Item>
    <Menu.Item key="1">
      720p
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">1080</Menu.Item>
  </Menu>
)

export default VideoPlayer;