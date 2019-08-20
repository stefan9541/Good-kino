import React from 'react';
import { Input, Form, Button, Icon } from "antd";

import "./search-input.css"

class SearchInput extends React.Component {

  render() {
    const { getFieldDecorator, getFieldValue, getFieldError, isFieldTouched } = this.props.form;
    const { onInputFocus, handleSubmit, onInputChange } = this.props;
    const searchValue = getFieldValue("search-input");

    // Only show error after a field is touched.
    const searchError = isFieldTouched('search-input') && getFieldError('search-input');

    return (
      <Form className="search-form" autoComplete={"off"} onSubmit={(e) =>handleSubmit(e,searchValue)}>
        <Form.Item className="search-form-input" style={{ marginBottom: 0 }} validateStatus={searchError ? 'error' : ''} help={searchError || ''}>
          {
            getFieldDecorator('search-input', {
              rules: [{ min: 2, message: 'Пожалуста введите 2 или больше символов' }],
              initialValue: this.props.defaultValue
            })
              (
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
    )
  }
}
export default Form.create({ name: "search-form" })(SearchInput);