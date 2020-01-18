import React, { PureComponent } from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { compose } from "redux";
import AuthModal from "../auth-modal";
import RegisterModal from "../register-modal";
import UserProfileMenuDropdown from "../user-profile-menu-dropdown";

import "./auth-profile.css";

class AuthAndProfile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      authModal: false,
      registerModal: false
    };
  }

  showModal = ({ target: { name } }) => {
    this.setState({
      [name]: true
    });
  };

  handleCancel = () => {
    this.setState({
      authModal: false,
      registerModal: false
    });
  };

  render() {
    const {
      loading,
      continueWatch,
      favoriteMovies,
      picture,
      userName,
      isAuth
    } = this.props;

    // if (loading) {
    //   return (
    //     <div>
    //       <Avatar icon="user" />
    //       <Avatar icon="user" />
    //     </div>
    //   );
    // }

    return (
      <React.Fragment>
        <div className="auth-profile-wrap">
          {isAuth && !loading ? (
            <div>
              <UserProfileMenuDropdown
                favoriteMovies={favoriteMovies}
                continueWatch={continueWatch}
                userName={userName}
                picture={picture}
              />
            </div>
          ) : (
            <div className="reg-auth-button-wrapp">
              <Button name="authModal" onClick={this.showModal} ghost>
                Войти
              </Button>
              <Button
                type="primary"
                name="registerModal"
                onClick={this.showModal}
                ghost
              >
                Регистрация
              </Button>
            </div>
          )}
        </div>
        <AuthModal
          visible={this.state.authModal}
          handleCancel={this.handleCancel}
        />
        <RegisterModal
          visible={this.state.registerModal}
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
    userName: state.userReducer.userName,
    isAuth: state.userReducer.isAuth,
    loading: state.userReducer.loading
  };
};

export default compose(connect(mapStateToProps))(AuthAndProfile);
