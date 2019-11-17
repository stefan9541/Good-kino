import React from "react";
import { Avatar, Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";

import "./user-profile.css";

const menu = (
  <Menu className="user-profile-menu">
    <Menu.Item key="0">
      <Link to="/continue">
        Досмотреть
      </Link>
    </Menu.Item>
    <Menu.Item key="1">
      <Link to="/favorite">
        Избранные
      </Link>
    </Menu.Item>
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);

const UserProfile = ({ user }) => {
  return (
    <Dropdown
      overlay={menu}
      placement="bottomCenter"
      trigger={["click"]}
    >
      <Avatar className="user-avatar" size="large" src={user.picture} />
    </Dropdown>
  );
};

export default UserProfile;
