import React from "react";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Col } from "antd";
import UserAvatar from "../update-user-avatar";

import "./profile-setting-main.css";
import { withGoodKinoService } from "../hoc";
import { handleUpdateAvatar, changeUsername } from "../../actions/user-actions";
import ChangeUserNickname from "../change-user-nickname";

const ProfileMainSettingTabs = props => {
  const { userName, handleUpdateAvatar, avatarLoading, changeUsername } = props;
  return (
    <Col className="setting-main-tab">
      <UserAvatar
        avatarLoading={avatarLoading}
        handleUpdateAvatar={handleUpdateAvatar}
      />

      <ChangeUserNickname changeUsername={changeUsername} username={userName} />
    </Col>
  );
};

const mapStateToProps = state => {
  return {
    userName: state.userReducer.userName,
    avatarLoading: state.userReducer.avatarLoading
  };
};
const mapDispatchToProps = (dispatch, props) => {
  const { updateUserAvatar, changeUsernameQuery } = props.goodKinoService;
  return bindActionCreators(
    {
      handleUpdateAvatar: handleUpdateAvatar(updateUserAvatar),
      changeUsername: changeUsername(changeUsernameQuery)
    },
    dispatch
  );
};
export default compose(
  withGoodKinoService(),
  connect(mapStateToProps, mapDispatchToProps)
)(ProfileMainSettingTabs);
