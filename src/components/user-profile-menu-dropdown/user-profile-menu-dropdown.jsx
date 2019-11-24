import React from "react";
import { Avatar, Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";

import "./user-profile-menu-dropdown.css";

const UserProfileMenuDropdown = ({ favoriteMovies, continueWatch, picture }) => {
  console.log('asd')
  return (
    <Dropdown
      overlay={() => {
        return (
          <Menu className="user-profile-menu">
            <Menu.Item key="0">
              <Link to="/continue">
                Досмотреть ({continueWatch.length || 0})
              </Link>
            </Menu.Item>
            <Menu.Item key="1">
              <Link to="/favorite">
                Избранные ({favoriteMovies.length || 1})
              </Link>
            </Menu.Item>
          </Menu>
        )
      }}
      placement="bottomCenter"
      trigger={["click"]}
    >
      <Avatar className="user-avatar" size="large" src={picture} />
    </Dropdown>
  );
};

export default UserProfileMenuDropdown;
