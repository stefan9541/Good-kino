import React, { Component } from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { compose } from "redux";
import AuthModal from "../auth-modal";
import UserProfile from "../user-profile";

class AuthAndProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        <div>
          {
            (user) ? (
              <UserProfile user={user} />
            )
              : (
                <Button onClick={this.showModal} ghost>
                  Войти
                </Button>
              )
          }
        </div>
        <AuthModal
          visible={this.state.visible}
          handleCancel={this.handleCancel}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  };
};

export default compose(
  connect(mapStateToProps)
)(AuthAndProfile);
