/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from "react";
import { Modal, Button, Row, Form, Input, Icon, Tooltip, Result } from "antd";
import { withGoodKinoService } from "../hoc";

import "./register-modal.css";

const RegisterModal = React.memo(props => {
  const [showSuccessMessage, toogleSuccessMessage] = useState(false);
  const { handleCancel, visible } = props;
  const {
    getFieldDecorator,
    validateFields,
    resetFields,
    setFields
  } = props.form;
  const { registerNewUser } = props.goodKinoService;

  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value) {
      validateFields(["confirm"], { force: true });
    }
    callback();
  };

  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        registerNewUser(values)
          .then(() => {
            toogleSuccessMessage(true);
            resetFields();
          })
          .catch(({ response }) => {
            setFields({
              email: {
                value: values.email,
                errors: [new Error(response.data.message)]
              }
            });
          });
      }
    });
  };

  const successMessage = (
    <Result
      status="success"
      title="Your account has ben successfully registered"
      subTitle="Your account has been successfully registered, now you can log in using your Email"
    />
  );

  return (
    <Row>
      <Modal
        className="register-modal"
        visible={visible}
        footer={null}
        onCancel={e => {
          handleCancel(e);
          setTimeout(() => {
            toogleSuccessMessage(false);
          }, 500);
        }}
      >
        {showSuccessMessage ? (
          successMessage
        ) : (
          <Form onSubmit={handleSubmit} autoComplete="off">
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
              label={
                <span className="register-form-label">
                  Nickname&nbsp;
                  <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator("userName", {
                rules: [
                  {
                    required: true,
                    message: "Please input your nickname!",
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Button
              style={{ marginTop: "5px" }}
              type="primary"
              htmlType="submit"
            >
              Register
            </Button>
          </Form>
        )}
      </Modal>
    </Row>
  );
});

export default Form.create({ name: "register" })(
  withGoodKinoService()(RegisterModal)
);
