import React from "react";
import { Col, Input, Button } from "antd";
import UserAvatar from "../update-user-avatar";

import "./profile-setting-main.css";

const ProfileMainSettingTabs = () => {
  return (
    <Col className="setting-main-tab">
      <UserAvatar />

      <Col span={5} offset={1}>
        <h3>Change your username</h3>
        <form autoComplete="off">
          <Input placeholder="change your nickname" />
          <Button htmlType="submit" style={{ marginTop: "8px" }}>
            Изменить
          </Button>
        </form>
      </Col>
    </Col>
  );
};

export default ProfileMainSettingTabs;
