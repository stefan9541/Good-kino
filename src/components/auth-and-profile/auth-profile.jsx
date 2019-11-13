import React, { Component } from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { compose } from "redux";
import AuthModal from "../auth-modal";

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
            (user) ? <div>{user.userName}</div>
              : (
                <Button onClick={this.showModal} ghost>
                  Войти
                </Button>
              )
          }
        </div>
        <div>
          <AuthModal
            visible={this.state.visible}
            handleCancel={this.handleCancel}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userData.movies
  };
};

export default compose(
  connect(mapStateToProps)
)(AuthAndProfile);
