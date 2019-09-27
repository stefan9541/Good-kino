import React, { Component } from "react";
import {
  Col, Input, Form, Icon, Switch
} from "antd";

import "./movie-comment-form.css";

const { TextArea } = Input;

class MovieCommentForm extends Component {
  render() {
    const { getFieldDecorator, validateFields, resetFields } = this.props.form;
    const {
      handleSwitchChecked,
      handleFocus,
      handleTextAreaChange,
      handleButtonClick,
      handleSubmit,
      visibleSubmit,
      disableSubmit
    } = this.props;
    return (
      <Col style={{ backgroundColor: "#2d2d2d", padding: "15px", marginBottom: "15px" }}>
        <Form
          autoComplete="off"
          onSubmit={e => {
            validateFields((err, values) => {
              handleSubmit(e, err, values, resetFields);
            });
          }}
        >
          <Col className="comment-nickname-wrapp">
            <Col span={8}>
              <Form.Item required>
                {getFieldDecorator("nickname", {
                  rules: [{ min: 3, required: true }],
                  initialValue: localStorage.getItem("nickname") || ""
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                    placeholder="your nickname"
                  />
                )}
              </Form.Item>
            </Col>
            <Col offset={1}>
              <Form.Item>
                <span style={{ color: "aliceblue", marginRight: "10px" }}>
                  Save nickname
                </span>
                <Switch
                  className="save-nickname-switch"
                  defaultChecked
                  onChange={handleSwitchChecked}
                  checkedChildren={<Icon type="check" />}
                  unCheckedChildren={<Icon type="close" />}
                />
              </Form.Item>
            </Col>
          </Col>
          <Form.Item>
            {
              getFieldDecorator("commentText", {
                rules: [{ required: true }],
                initialValue: ""
              })(
                <TextArea
                  onFocus={handleFocus}
                  onChange={handleTextAreaChange}
                  autosize={{ minRows: 2, maxRows: 6 }}
                  placeholder="Оставьте комментарий"
                />
              )
            }
          </Form.Item>
          {
            (visibleSubmit)
              ? (
                <Col className="comment-button-wrapp">
                  <button
                    type="button"
                    className="send-comment-button"
                    onClick={handleButtonClick}
                  >
                    ОТМЕНА
                  </button>
                  <button
                    type="submit"
                    disabled={disableSubmit}
                    className="send-comment-button"
                  >
                    ОСТАВИТЬ КОММЕНТАРИЙ
                  </button>
                </Col>
              )
              : null
          }
        </Form>
      </Col>
    );
  }
}

export default Form.create({ name: "commentaries-form" })(MovieCommentForm);
