import React from "react";
import { Col, Rate, Button } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withGoodKinoService } from "../hoc";
import { handleVoted } from "../../actions/user-actions";

import "./movie-rate.css";
import Axios from "axios";

const MovieRate = props => {
  const {
    movieId,
    handleVoted,
    usersRate,
    usersVotes,
    ratedMovies = [],
    isAuth
  } = props;
  const dublicateMovie = ratedMovies.find(item => item.movieId === movieId);
  const average = (usersRate / usersVotes).toFixed(1);
  // if average > 1 && < 1.5 round to 1.5 else if avarage > 1.5 round to 2
  const rate = Math.ceil(average * 2) / 2;
  // chek if rate = NaN it is bacause userRate = 0 && usersVote = 0

  const handleChange = value => {
    handleVoted(movieId, value, dublicateMovie);
  };

  return (
    <Col className="rate-block-wrap">
      <span style={{ color: "#0faeef" }}>Оцени Фильм: &#160; &#160;</span>
      <Button
        onClick={() => {
          Axios.get(`http://localhost:8080/api/notification/${movieId}`);
        }}
        type="primary"
      >
        push noticifation
      </Button>
      <Rate
        onChange={handleChange}
        count={10}
        value={rate}
        disabled={!isAuth}
        allowClear={false}
        allowHalf
      />
      {rate ? (
        <React.Fragment>
          <span>({average}) &#160;</span>
          <span>
            &#160;&#160;
            {usersVotes}
          </span>
          <div className="user-vote">
            <span>
              {dublicateMovie ? `ваша оценка ${dublicateMovie.rate}` : null}
            </span>
          </div>
        </React.Fragment>
      ) : (
        <span>No vote, be the first</span>
      )}
    </Col>
  );
};

const mapStateToProps = state => {
  return {
    ratedMovies: state.userReducer.ratedMovies,
    isAuth: state.userReducer.isAuth
  };
};

const mapDistatchToProps = (dispatch, props) => {
  const { fetchUpdateMovieRate } = props.goodKinoService;
  return bindActionCreators(
    { handleVoted: handleVoted(fetchUpdateMovieRate) },
    dispatch
  );
};

export default withGoodKinoService()(
  connect(mapStateToProps, mapDistatchToProps)(React.memo(MovieRate))
);
