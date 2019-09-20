import React from "react";
import {
  Input, Form, Button, Icon
} from "antd";

import "./search-input.css";

class SearchInput extends React.Component {
  render() {
    const {
      getFieldDecorator,
      validateFields
    } = this.props.form;
    const { onInputFocus, handleSubmit, onInputChange } = this.props;

    return (
      <Form
        className="search-form"
        autoComplete="off"
        onSubmit={e => {
          validateFields((err, values) => {
            handleSubmit(e, err, values.searchInput);
          });
        }}
      >
        <Form.Item className="search-form-input" style={{ marginBottom: 0 }}>
          {
            getFieldDecorator("searchInput", {
              rules: [{ min: 2, required: true, message: "Введите 2 или больше символа" }],
              initialValue: this.props.defaultValue || ""
            })(
              <Input
                onFocus={onInputFocus}
                onChange={onInputChange}
                name="search-input"
              />
            )
          }
        </Form.Item>
        <Form.Item className="search-form-button">
          <Button htmlType="submit" type="primary">
            <Icon type="search" />
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
export default Form.create({ name: "search-form" })(SearchInput);
