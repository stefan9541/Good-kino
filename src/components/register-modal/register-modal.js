import React from "react";
import {
  Modal,
  Button,
  Col,
  Row,
  Form,
  Input,
  Icon,
  Tooltip
} from "antd";

import "./register-modal.css";

const RegisterModal = React.memo(props => {
  const { handleCancel, visible } = props;
  const { getFieldDecorator } = props.form;

  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    const { form } = props;
    if (value) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  return (
    <Row>
      <Modal
        visible={visible}
        footer={null}
        onCancel={handleCancel}
      >
        <Form autoComplete="off">
          <Form.Item
            hasFeedback
            label="E-mail"
            className="register-form-item"
          >
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item
            hasFeedback
            className="register-form-item"
            label="Password"
          >
            {getFieldDecorator("password", {
              rules: [
                {
                  whitespace: true
                },
                {
                  required: true,
                  message: "Please input your password!"
                },
                {
                  min: 5,
                  message: "min length of password is 5"
                },
                {
                  validator: validateToNextPassword
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item
            className="register-form-item"
            label="Confirm Password"
            hasFeedback
          >
            {getFieldDecorator("confirm", {
              rules: [
                {
                  whitespace: true
                },
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                {
                  validator: compareToFirstPassword
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item
            className="register-form-item"
            label={(
              <span>
                Nickname&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
          >
            {getFieldDecorator("nickname", {
              rules: [{ required: true, message: "Please input your nickname!", whitespace: true }]
            })(<Input />)}
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form>
      </Modal>
    </Row>
  );
});

export default Form.create({ name: "register" })(RegisterModal);
