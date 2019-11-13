import React from "react";
import {
  Modal, Button, Col, Row
} from "antd";

import "./auth-modal.css";


const AuthModal = props => {
  const { handleCancel, visible } = props;
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
        <Col className="auth-body">
          <Button size="large" icon="google">
            <a
              href="http://localhost:8080/api/google-auth"
              style={{ marginLeft: "10px" }}
            >
              sign up with google
            </a>
          </Button>
        </Col>
      </Modal>
    </Row>
  );
};

export default AuthModal;
