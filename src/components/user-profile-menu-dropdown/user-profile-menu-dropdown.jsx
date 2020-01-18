/* eslint-disable operator-linebreak */
import React from "react";
import { Avatar, Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";

import "./user-profile-menu-dropdown.css";

const UserProfileMenuDropdown = props => {
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080/api"
      : "https://good-kino.herokuapp.com/api/logout";
  const { favoriteMovies, continueWatch, picture, userName } = props;
  const sliceName =
    userName.length > 15 ? `${userName.slice(0, 15)}...` : userName;
  return (
    <Dropdown
      overlay={() => {
        return (
          <Menu className="user-profile-menu">
            <Menu.Item className="menu-item-user-name" key="5">
              {sliceName}
            </Menu.Item>
            <Menu.Divider style={{ margin: "5px 0" }} />
            <Menu.Item key="0">
              <Link to="/continue">
                Досмотреть ({continueWatch.length || 0})
              </Link>
            </Menu.Item>
            <Menu.Item key="1">
              <Link to="/favorite">
                Избранные ({favoriteMovies.length || 0})
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/setting">Профиль</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <a href={url}>Выйти</a>
            </Menu.Item>
          </Menu>
        );
      }}
      placement="bottomCenter"
      trigger={["click"]}
    >
      <Avatar className="user-avatar" size="large" src={picture} />
    </Dropdown>
  );
};

export default UserProfileMenuDropdown;
