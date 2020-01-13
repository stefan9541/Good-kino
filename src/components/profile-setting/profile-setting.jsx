/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import { Tabs, Icon, Col } from "antd";
import ProfileMainSettingTabs from "../profile-setting-main/profile-setting-main";

import "./profile-setting.css";

const { TabPane } = Tabs;
const ProfileSetting = () => {
  return (
    <Col className="setting-wrapp">
      <h1>User profile</h1>
      <Tabs className="setting-tabs" defaultActiveKey="1">
        <TabPane
          tab={
            <span className="tab-header">
              <Icon type="setting" />
              Main
            </span>
          }
          key="1"
        >
          <ProfileMainSettingTabs />
        </TabPane>
        <TabPane
          tab={
            <span className="tab-header">
              <Icon type="unordered-list" />
              your commentaries
            </span>
          }
          key="2"
        >
          Tab 2
        </TabPane>
      </Tabs>
    </Col>
  );
};

export default ProfileSetting;
