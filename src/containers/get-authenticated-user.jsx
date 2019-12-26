import { Component } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchUser } from "../actions/user-actions";
import { withGoodKinoService } from "../components/hoc";

class GetAuthenticatedUser extends Component {
  componentDidMount() {
    const { fetchUser } = this.props;
    fetchUser();
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = (dispatch, props) => {
  const { getAuthenticatedUser } = props.goodKinoService;
  return bindActionCreators(
    { fetchUser: fetchUser(getAuthenticatedUser) },
    dispatch
  );
};

export default compose(
  withGoodKinoService(),
  connect(null, mapDispatchToProps)
)(GetAuthenticatedUser);
