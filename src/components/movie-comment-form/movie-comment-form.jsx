import React, { Component } from "react";
import { Col, Input, Form } from "antd";

import "./movie-comment-form.css";

const { TextArea } = Input;

class MovieCommentForm extends Component {
  render() {
    const { getFieldDecorator, validateFields, resetFields } = this.props.form;
    const {
      handleFocus,
      handleTextAreaChange,
      handleButtonClick,
      handleSubmit,
      visibleSubmit,
      disableSubmit
    } = this.props;
    return (
      <Col
        style={{
          backgroundColor: "#2d2d2d",
          padding: "15px",
          marginBottom: "15px"
        }}
      >
        <Form
          autoComplete="off"
          onSubmit={e => {
            validateFields((err, values) => {
              handleSubmit(e, err, values, resetFields);
            });
          }}
        >
          <Form.Item className="comment-form-item">
            {getFieldDecorator("commentText", {
              rules: [{ required: true }],
              initialValue: ""
            })(
              <TextArea
                onFocus={handleFocus}
                onChange={handleTextAreaChange}
                autosize={{ minRows: 2, maxRows: 6 }}
                placeholder="Оставьте комментарий"
              />
            )}
          </Form.Item>
          {visibleSubmit ? (
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
          ) : null}
        </Form>
      </Col>
    );
  }
}

export default Form.create({ name: "commentaries-form" })(MovieCommentForm);
