import React from "react";
import { Col, Rate } from "antd";
import { connect } from "react-redux";
import { withGoodKinoService } from "../hoc";
import { addMovieToVoted } from "../../actions/user-actions";
import { updateMovieRate } from "../../actions/movie-data-action";

import {
  successMessage,
  warningMessage
} from "../../utils/feed-back";

import "./movie-rate.css";

const MovieRate = props => {
  const {
    movieId,
    usersRate,
    usersVotes,
    addMovieToVoted,
    updateMovieRate,
    user
  } = props;
  const { ratedMovies = [] } = user || [];
  const dublicateMovie = ratedMovies.find(item => item.movieId === movieId);
  const { fetchUpdateMovieRate } = props.goodKinoService;
  console.log(dublicateMovie)
  const average = (usersRate / usersVotes).toFixed(1);
  // if average > 1 && < 1.5 round to 1.5 else if avarage > 1.5 round to 2
  const rate = Math.ceil(average * 2) / 2;
  // chek if rate = NaN it is bacause userRate = 0 && usersVote = 0

  const handleChange = value => {
    if (dublicateMovie) {
      return warningMessage("Вы уже голосовали");
    }
    fetchUpdateMovieRate(value, movieId)
      .then(() => {
        addMovieToVoted(movieId, value);
        updateMovieRate(value, "movie-page");
        successMessage("Голос добавлен! Спасибо");
      });
  };

  return (
    <Col className="rate-block-wrap">
      <span style={{ color: "#0faeef" }}>Оцени Фильм: &#160; &#160;</span>
      <Rate
        onChange={handleChange}
        count={10}
        value={rate}
        disabled={!user}
        allowClear={false}
        allowHalf
      />
      {
        (rate)
          ? (
            <React.Fragment>
              <span>({average}) &#160;</span>
              <span>
                &#160;&#160;
                {usersVotes}
              </span>
              <div className="user-vote">
                <span>
                  {
                    (dublicateMovie)
                      ? `ваша оценка ${dublicateMovie.rate}`
                      : null
                  }
                </span>
              </div>
            </React.Fragment>
          ) : (
            <span>
              No vote, be the first
            </span>
          )
      }
    </Col>
  );
};

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  };
};

const mapDistatchToProps = {
  addMovieToVoted,
  updateMovieRate
};

export default withGoodKinoService()(
  connect(mapStateToProps, mapDistatchToProps)(MovieRate)
);
