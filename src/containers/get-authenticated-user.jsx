import { Component } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as getAuthenticatedUserActions from "../actions/movie-data-action";
import withGoodKinoService from "../components/hoc";

class GetAuthenticatedUser extends Component {
  componentDidMount() {
    const reducerName = "user-data";
    const { getAuthenticatedUser } = this.props.goodKinoService;
    const {
      fetchMovieDataRequest,
      fetchMovieDataSuccess,
      fetchMovieDataFailure
    } = this.props;
    fetchMovieDataRequest(reducerName);
    getAuthenticatedUser()
      .then(res => {
        fetchMovieDataSuccess(res.data, reducerName);
      })
      .catch(err => fetchMovieDataFailure(err, reducerName));
  }

  render() {
    return (null);
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...getAuthenticatedUserActions }, dispatch);
};


export default compose(
  withGoodKinoService(),
  connect(null, mapDispatchToProps)
)(GetAuthenticatedUser);
