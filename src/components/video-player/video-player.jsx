/* eslint-disable operator-linebreak */
import React, { Component } from "react";
import { compose } from "redux";
import { Icon, Spin } from "antd";
import { connect } from "react-redux";
import { withGoodKinoService } from "../hoc";
import { addMovieToContinueWatch } from "../../actions/user-actions";
import Video from "../video";
import VideoControlPanel from "../video-control-panel";
import QualityChange from "../quality-change";

import "./video-player.css";

// const = React.createRef()
const customRef = React.createRef();
const videoRef = React.createRef();

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tooglePlay: false,
      loading: true,
      toogleQualityMenu: false,
      visiblePlayButton: true,
      duration: 0,
      currentTime: 0,
      volume: 50,
      videoPath: "",
      err: null
    };

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.handleFetchVideoforPlayer();

    window.addEventListener("click", this.hideQulityMenu);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.hideQulityMenu);
    this._isMounted = false;
  }

  hideQulityMenu = e => {
    if (e.target.className.animVal !== "") {
      this.setState(() => {
        return { toogleQualityMenu: false };
      });
    }
  };

  formatTime = time => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    let minuteValue;
    let secondValue;

    if (minutes < 10) {
      minuteValue = `0${minutes}`;
    } else {
      minuteValue = minutes;
    }

    if (seconds < 10) {
      secondValue = `0${seconds}`;
    } else {
      secondValue = seconds;
    }

    return hours > 0
      ? `${hours}:${minuteValue}:${secondValue}`
      : `${minuteValue}:${secondValue}`;
  };

  toolTipFormat = value => {
    const { duration } = this.state;
    const toolTipFormat = `${this.formatTime(value)} : ${this.formatTime(
      duration
    )}`;
    return toolTipFormat;
  };

  volumeToolTip = value => {
    return `${value}%`;
  };

  rewindVideo = value => {
    videoRef.current.pause();
    this.setState({ currentTime: Math.floor(value), toogleQualityMenu: false });
    videoRef.current.currentTime = Math.floor(value);
  };

  handleAfterChange = () => {
    const { tooglePlay } = this.state;
    if (tooglePlay) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  handleVolumeChange = value => {
    this.setState({ volume: value, toogleQualityMenu: false });
    videoRef.current.volume = value / 100;
  };

  tooglePlayVideo = () => {
    if (videoRef.current.paused) {
      this.setState({ tooglePlay: true, toogleQualityMenu: false });
      videoRef.current.play();
    } else {
      this.setState({ tooglePlay: false, toogleQualityMenu: false });
      videoRef.current.pause();
    }
  };

  hidePreviousPlayButton = () => {
    const duration = Math.floor(videoRef.current.duration);
    this.setState({
      visiblePlayButton: false,
      tooglePlay: true,
      toogleQualityMenu: false,
      duration
    });
    videoRef.current.play();
  };

  handleOnEnded = () => {
    this.setState(
      {
        tooglePlay: false,
        currentTime: 0,
        visiblePlayButton: true
      },
      () => {
        videoRef.current.pause();
      }
    );
  };

  fullScreenMode = () => {
    const videoCurrent = customRef.current;
    this.setState({ toogleQualityMenu: false });

    if (
      // alternative standard method
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      // current working methods
      if (videoCurrent.requestFullscreen) {
        videoCurrent.requestFullscreen();
      } else if (videoCurrent.msRequestFullscreen) {
        videoCurrent.msRequestFullscreen();
      } else if (videoCurrent.mozRequestFullScreen) {
        videoCurrent.mozRequestFullScreen();
      } else if (videoCurrent.webkitRequestFullscreen) {
        videoCurrent.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  };

  getCurrentTime = () => {
    this.setState({ currentTime: Math.floor(videoRef.current.currentTime) });
  };

  toogleQualityMenu = () => {
    this.setState({ toogleQualityMenu: !this.state.toogleQualityMenu });
  };

  handleFetchVideoforPlayer = quality => {
    const { fetchVideoForPlayer } = this.props.goodKinoService;
    const { movieId } = this.props;
    this.setState({ loading: true }, () => {
      fetchVideoForPlayer(movieId, quality || "720")
        .then(({ data }) => {
          if (this._isMounted) {
            this.setState({
              visiblePlayButton: true,
              tooglePlay: true
            });
            videoRef.current.src = data.path;
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        })
        .catch(err => this.setState({ err }));
    });
  };

  handleAddMovieToContinueWatch = () => {
    const { updateContinueMovieUserCollection } = this.props.goodKinoService;
    const {
      movieId,
      continueWatch,
      addMovieToContinueWatch,
      title,
      genre,
      type
    } = this.props;
    if (!continueWatch) {
      return;
    }
    const movieAlreadyHave = continueWatch.some(
      item => item.movieId === movieId
    );
    const isWatch = false;
    const date = Date.now();

    if (movieAlreadyHave) {
      return;
    }
    updateContinueMovieUserCollection({
      movieId,
      title,
      genre,
      type
    }).then(() => {
      addMovieToContinueWatch({
        movieId,
        isWatch,
        date,
        title,
        type,
        genre: genre.split(",")[0]
      });
    });
  };

  onLoadedData = loading => {
    this.setState({ loading });
  };

  render() {
    const {
      tooglePlay,
      visiblePlayButton,
      toogleQualityMenu,
      currentTime,
      duration,
      volume,
      loading
    } = this.state;

    const volumeIcon =
      volume === 0 ? (
        <i>
          <img src="/svg-icon/123.svg" alt="" />
        </i>
      ) : (
        <Icon type="sound" theme="filled" />
      );
    const playPauseIcon = tooglePlay ? (
      <Icon type="pause-circle" />
    ) : (
      <Icon type="play-circle" theme="filled" />
    );
    const onLoadVisibleBlock = visiblePlayButton ? "flex" : "none";
    const visibleQualityMenu = toogleQualityMenu ? "block" : "none";
    const durationFormat = this.formatTime(duration);
    const currentTimeFormat = this.formatTime(currentTime);

    return (
      <div ref={customRef} className="custom-video-player-wrapp">
        <Video
          handleOnEnded={this.handleOnEnded}
          onLoadedData={this.onLoadedData}
          videoPath={this.state.videoPath}
          loading={loading}
          continueWatchMovie={this.handleAddMovieToContinueWatch}
          ref={videoRef}
          getCurrentTime={this.getCurrentTime}
          tooglePlayVideo={this.tooglePlayVideo}
          hidePreviousPlayButton={this.hidePreviousPlayButton}
          onLoadVisibleBlock={onLoadVisibleBlock}
        />

        {loading ? (
          <Spin size="large" className="video-spin" />
        ) : (
          <React.Fragment>
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

                <QualityChange
                  toogleQualityMenu={this.toogleQualityMenu}
                  onQualityChange={this.handleFetchVideoforPlayer}
                  visible={visibleQualityMenu}
                />

                <div
                  onClick={this.fullScreenMode}
                  className="fullscreen-button"
                >
                  <Icon type="fullscreen" />
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    continueWatch: state.userReducer.continueWatch
  };
};

const mapDispatchToProps = {
  addMovieToContinueWatch
};

export default compose(
  withGoodKinoService(),
  connect(mapStateToProps, mapDispatchToProps)
)(VideoPlayer);
