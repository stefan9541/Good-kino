/* eslint-disable react/jsx-wrap-multilines */
import React, { Component } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import "./left-sidebar.css";

const { SubMenu } = Menu;

class LeftSidebarItem extends Component {
  rootSubmenuKeys = ["cartoon", "series", "anime", "films"];

  constructor(props) {
    super(props);
    this.state = {
      openKeys: [""]
    };
  }

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  };

  render() {
    const { sideBarItems } = this.props;
    return (
      <Menu
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        id="left-sidebar"
        mode="inline"
        selectable={false}
        theme="dark"
      >
        {sideBarItems.map(({ links, iconPath, type }) => {
          return (
            <SubMenu
              className="left-sidebar-sub-menu"
              key={type}
              title={
                <span>
                  <i className="sub-menu-icon-wrap">
                    <img
                      className="sub-menu-icon"
                      src={iconPath}
                      alt={`${type} icon img`}
                    />
                  </i>
                  {`${type} genres`}
                </span>
              }
            >
              {links.map(({ path, label }) => {
                return (
                  <Menu.Item key={type + label}>
                    <Link to={`/${type}/${path}`}>{label}</Link>
                  </Menu.Item>
                );
              })}
            </SubMenu>
          );
        })}
      </Menu>
    );
  }
}

export default LeftSidebarItem;
