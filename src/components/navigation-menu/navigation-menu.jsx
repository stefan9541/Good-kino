import React from "react";
import { Menu, Icon } from "antd";
import { NavLink, Link, withRouter } from "react-router-dom";


import "./navigation-menu.css";

const navLink = [
  { to: "", label: "Главная" },
  { to: "films", label: "Фильмы" },
  { to: "cartoon", label: "Мультфильмы" },
  { to: "series", label: "Сериалы" },
  { to: "anime", label: "Аниме" },
  {
    to: "top-100",
    label: "Топ 100",
    subMenu: [
      { subTo: "/top-100/films", subLabel: "Топ 100 Фильмов" },
      { subTo: "/top-100/cartoon", subLabel: "Топ 100 Мультфильмов" },
      { subTo: "/top-100/anime", subLabel: "Топ 100 Аниме" },
      { subTo: "/top-100/series", subLabel: "Топ 100 Сериалов" }
    ]
  }
];

const { SubMenu } = Menu;


const NavigationMenu = props => {
  const pathName = props.location.pathname;
  return (
    <Menu selectable={false} id="nav-menu" mode="horizontal">
      {
        navLink.map(({ to, label, subMenu }, id) => {
          const splitingPath = pathName.split("/");
          const activeLink = splitingPath[1] === to ? "active-link" : "null";
          const activeItem = splitingPath[1] === to ? "active-item-link" : "null";
          return (
            (subMenu)
              ? (
                <SubMenu
                  className={activeItem}
                  key={id}
                  title={(
                    <NavLink className={activeLink} to={`/${to}`}>
                      {label}
                      <Icon type="down" />
                    </NavLink>
                  )}
                >
                  <Menu.ItemGroup id="sub-menu-group">
                    {
                      (subMenu || []).map(({ subTo, subLabel }) => {
                        return (
                          <Menu.Item key={subTo}>
                            <Link to={subTo}>
                              {subLabel}
                            </Link>
                          </Menu.Item>
                        );
                      })
                    }
                  </Menu.ItemGroup>
                </SubMenu>
              )
              : (
                <Menu.Item className={activeItem} key={label}>
                  <NavLink className={activeLink} to={`/${to}`}>
                    {label}
                  </NavLink>
                </Menu.Item>
              )
          );
        })
      }
    </Menu>
  );
};


export default withRouter(NavigationMenu);
