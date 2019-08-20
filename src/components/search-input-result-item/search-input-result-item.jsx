import React, { Component } from 'react';
import { Menu, Dropdown, Spin } from "antd";
import { Link } from "react-router-dom";

import "./search-input-result-item.css";

function fixedEncodeURIComponent(str) {
  return encodeURI(str).replace(/%20/g, '+')
}

class SearchInputResultItem extends Component {

  render() {
    const { visible, handleMenuClick, handleVisibleChange, item, loading } = this.props
    return (
      <Dropdown
        overlay={<MenuItem handleMenuClick={handleMenuClick} item={item} loading={loading} />}
        trigger={["click"]}
        onVisibleChange={handleVisibleChange}
        visible={visible}
      >
        <span>
        </span>
      </Dropdown>
    );
  }
}

const MenuItem = ({ item, loading, handleMenuClick }) => {
  let resultHint;

  if (item.length < 1) {
    resultHint = "По вашему запросу ничего не найдено попробуйте ввести что нибудь другое"
  } else if (item.length <= 5) {
    resultHint = null;
  } else {
    resultHint = `Смотреть все результаты найдено (${item.length})`
  };

  if (loading) {
    return (
      <Menu id="search-result-item">
        <Menu.Item>
          <Spin size="small" />
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <Menu onClick={handleMenuClick} selectable={false} id="search-result-item">
      {
        (item || []).slice(0, 5).map(({ Title, Genre, Type, _id }) => {
          const genre = Genre.split(",")[0];
          const linkHref = `/${Type}/${genre}/${Title}`;
          return (
            <Menu.Item style={{height: "auto"}} key={_id}>
              <Link style={{whiteSpace:"pre-wrap"}} to={fixedEncodeURIComponent(linkHref)}>
                <span>
                  {Title}
                </span>
              </Link>
            </Menu.Item>
          )
        })
      }
      {
        (resultHint) ?
          <Menu.Item>
            {resultHint}
          </Menu.Item> : null
      }
    </Menu>
  )
}

export default SearchInputResultItem