import React from 'react';
import { Menu } from "antd"
import { Link } from "react-router-dom"

import "./left-sidebar.css"

const { SubMenu } = Menu;

const LeftSidebarItem = ({ sideBarItems }) => {
  return (
    <Menu
      id="left-sidebar"
      mode="inline"
      selectable={false}
      theme={"dark"}
    >
      {
        sideBarItems.map(({ links, iconPath, type }) => {
          return (
            <SubMenu
              className={"left-sidebar-sub-menu"}
              key={type}
              title={
                <span>
                  <i className={"sub-menu-icon-wrap"}>
                    <img className={"sub-menu-icon"} src={iconPath} alt={`${type} icon img`} />
                  </i>
                  {`${type} genres`}
                </span>
              }>
              {
                links.map(({ path, label }) => {
                  return (
                    <Menu.Item key={type + label}>
                      <Link to={`/${type}/${path}`}>
                        {label}
                      </Link>
                    </Menu.Item>
                  )
                })
              }
            </SubMenu>
          )
        })
      }
    </Menu>
  )
}


export default LeftSidebarItem;
