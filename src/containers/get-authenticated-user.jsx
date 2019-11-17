import { Component } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as getAuthenticatedUserActions from "../actions/user-actions";
import { withGoodKinoService } from "../components/hoc";

class GetAuthenticatedUser extends Component {
  componentDidMount() {
    const { getAuthenticatedUser } = this.props.goodKinoService;
    const {
      fetchUserDataRequest,
      fetchUserDataSuccess,
      fetchUserovieDataFailure
    } = this.props;

    fetchUserDataRequest();
    getAuthenticatedUser()
      .then(res => {
        fetchUserDataSuccess(res.data);
      })
      .catch(err => fetchUserovieDataFailure(err));
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
