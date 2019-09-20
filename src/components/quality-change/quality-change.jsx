import React from "react";
import { Icon, Menu } from "antd";

import "./quality-change.css";

const QualityChange = ({ toogleQualityMenu, visible, onQualityChange }) => {
  return (
    <div onClick={toogleQualityMenu} className="quality-change">
      <div style={{ display: visible }} className="overlay-qality">
        <QualityMenu onQualityChange={onQualityChange} />
      </div>
      <Icon type="setting" />
    </div>
  );
};

const QualityMenu = props => {
  return (
    <Menu onClick={item => props.onQualityChange(item.key)}>
      <Menu.Divider />
      <Menu.Item key="480">
        480p
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="720">
        720p
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1080">1080</Menu.Item>
    </Menu>
  );
};

export default QualityChange;
