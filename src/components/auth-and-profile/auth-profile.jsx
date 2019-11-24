import React, { Component } from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { compose } from "redux";
import AuthModal from "../auth-modal";
import UserProfileMenuDropdown from "../user-profile-menu-dropdown";

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
    const {
      loading,
      continueWatch,
      favoriteMovies,
      picture,
      isAuth
    } = this.props;

    if (loading) {
      return false;
    }

    return (
      <React.Fragment>
        <div>
          {
            (isAuth) ? (
              <UserProfileMenuDropdown
                favoriteMovies={favoriteMovies}
                continueWatch={continueWatch}
                picture={picture}
              />
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
    continueWatch: state.userReducer.continueWatch,
    favoriteMovies: state.userReducer.favoriteMovies,
    picture: state.userReducer.picture,
    isAuth: state.userReducer.isAuth,
    loading: state.userReducer.loading
  };
};

export default compose(
  connect(mapStateToProps)
)(AuthAndProfile);
