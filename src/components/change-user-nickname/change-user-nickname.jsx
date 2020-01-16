import React from "react";
import { Form, Input, Col, Button } from "antd";
import { warningMessage } from "../../utils/feed-back";

const rules = [
  {
    min: 4
  },
  {
    max: 15,
    message: "max length is 16"
  },
  {
    required: true
  }
];

const ChangeUserNickname = props => {
  const { getFieldDecorator, validateFields, setFields } = props.form;
  const { username, changeUsername } = props;

  const handleSubmit = e => {
    e.preventDefault();
    changeUsername(username, validateFields, setFields);
  };

  return (
    <Col span={5} offset={1}>
      <h3>Change your username</h3>
      <Form onSubmit={handleSubmit} autoSave="off" autoComplete="off">
        <Form.Item style={{ marginBottom: "10px" }}>
          {getFieldDecorator("username", {
            rules: [...rules],
            initialValue: username
          })(
            <Input
              style={{ fontWeight: 600, color: "#1890ff" }}
              name="username"
            />
          )}
        </Form.Item>
        <Button htmlType="submit" style={{ marginTop: "8px" }}>
          Изменить
        </Button>
      </Form>
    </Col>
  );
};

export default Form.create({ name: "username-form" })(ChangeUserNickname);
