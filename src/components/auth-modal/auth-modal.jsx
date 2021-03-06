/* eslint-disable operator-linebreak */
import React from "react";
import { Modal, Button, Col, Row, Form, Input, Icon, Tooltip } from "antd";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  fetchUserDataRequest,
  fetchUserDataSuccess,
  fetchUserovieDataFailure
} from "../../actions/user-actions";
import { withGoodKinoService } from "../hoc";

import "./auth-modal.css";

const AuthModal = React.memo(props => {
  const { getFieldDecorator, validateFields, setFields } = props.form;
  const {
    handleCancel,
    visible,
    fetchUserDataRequest,
    fetchUserDataSuccess,
    fetchUserovieDataFailure
  } = props;
  const { logInUser } = props.goodKinoService;
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080/api/google-auth"
      : "https://good-kino.herokuapp.com/api/google-auth";

  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (err) {
        return;
      }
      fetchUserDataRequest();
      logInUser(values)
        .then(({ data }) => {
          fetchUserDataSuccess(data);
          handleCancel();
        })
        .catch(({ response }) => {
          fetchUserovieDataFailure(response);
          setFields({
            email: {
              value: values.email,
              errors: [new Error(response.data.message)]
            },
            password: {
              value: values.password,
              errors: [new Error(response.data.message)]
            }
          });
        });
    });
  };

  return (
    <Row>
      <Modal
        visible={visible}
        className="auth-modal"
        footer={null}
        onCancel={handleCancel}
        bodyStyle={{
          height: "500px"
        }}
      >
        <Form className="login-form" onSubmit={handleSubmit}>
          <Form.Item className="auth-modal-item" label="E-mail">
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
          <Form.Item className="auth-modal-item" label="Password">
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input.Password
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Button className="auth-btn" type="primary" htmlType="submit">
            Log in
          </Button>
          <Col className="auth-body">
            <div className="sign-in-with">
              <h2>Or u can sign in with</h2>
            </div>
            <Tooltip title="Google auth not worked yet">
              <Button
                disabled
                onClick={() => {
                  window.open(url, "_self");
                }}
                size="large"
                icon="google"
              >
                Google
              </Button>
            </Tooltip>
          </Col>
        </Form>
      </Modal>
    </Row>
  );
});

const mapDispatchToProps = {
  fetchUserDataRequest,
  fetchUserDataSuccess,
  fetchUserovieDataFailure
};

export default compose(
  Form.create({ name: "auth" }),
  withGoodKinoService(),
  connect(null, mapDispatchToProps)
)(AuthModal);
