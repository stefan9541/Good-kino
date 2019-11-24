import React, { Component } from "react";
import {
  Menu, InputNumber, Form, Button, Select
} from "antd";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import "./extended-sample-left-sidebar.css";

const { Option } = Select;

class ExtendedSampleLeftSidebar extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { getFieldsValue } = this.props.form;
    const { history } = this.props;
    const { byType, byGenre, year } = getFieldsValue();
    const url = `/filter?byType=${byType}&byGenre=${byGenre}&year=${year}`;
    history.push(url);
  }

  handleSelectChange = () => {
    const { resetFields } = this.props.form;
    resetFields(["byGenre"]);
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { items } = this.props;
    const selectValueByType = getFieldValue("byType");
    const currentYear = new Date()
      .getFullYear();

    return (
      <Form onSubmit={this.handleSubmit}>
        <Menu id="extended-sample-panel" mode="inline" theme="dark">
          <Menu.SubMenu title={(
            <span>
              <i className="sub-menu-icon-wrap">
                <img className="sub-menu-icon" src="/svg-icon/filter.svg" alt="filter icon svg" />
              </i>
              {"Фильтры"}
            </span>
          )}
          >
            <Form.Item className="extended-form-item extended-form-label">
              Выборка по типу
            </Form.Item>
            <Form.Item className="extended-form-item">
              {
                getFieldDecorator("byType", {
                  initialValue: "films"
                })(
                  <Select onChange={this.handleSelectChange} className="extended-panel-select">
                    <Option value="films">Фильмы</Option>
                    <Option value="series">Сериалы</Option>
                    <Option value="anime">Аниме</Option>
                    <Option value="cartoon">Мультфильмы</Option>
                  </Select>
                )
              }
            </Form.Item>

            <Form.Item className="extended-form-item extended-form-label">
              По жанрам
            </Form.Item>

            {/* if value of select(by-type) === films, render only films genre */}

            <Form.Item className="extended-form-item">
              {
                getFieldDecorator("byGenre", {
                  initialValue: "Adventure"
                })(
                  <Select className="extended-panel-select">
                    {
                      (items || []).map(item => {
                        if (selectValueByType === item.type) {
                          return (
                            item.links.map(({ label }) => {
                              return (
                                <Option value={label}>{label}</Option>
                              );
                            })
                          );
                        }
                      })
                    }
                  </Select>
                )
              }
            </Form.Item>

            <Form.Item className="extended-form-item extended-form-label">
              Годам
            </Form.Item>

            <Form.Item className="extended-form-item">
              {
                getFieldDecorator("year", {
                  rules: [{
                    min: "1950", max: currentYear, type: "number", message: " "
                  }],
                  initialValue: "2015"
                })(
                  <InputNumber className="extended-input-number" />
                )
              }
            </Form.Item>

            <Form.Item className="extended-form-item">
              <Button htmlType="submit" className="extended-panel-select">
                Применить Фильтры
              </Button>
            </Form.Item>
          </Menu.SubMenu>
        </Menu>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.leftSidebarReducer.leftSidebarItems
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps)
)(Form.create({ name: "extended-sample-form" })(ExtendedSampleLeftSidebar));
