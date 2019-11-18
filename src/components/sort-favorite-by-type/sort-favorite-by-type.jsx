import React from "react";
import {
  Select, Form, Menu, Button
} from "antd";
import queryStr from "query-string";
import { withRouter } from "react-router-dom";

const { Option } = Select;

const SortFavoriteByType = props => {
  const { byType, orderBy } = queryStr.parse(props.location.search);
  const { getFieldDecorator, validateFields } = props.form;

  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      const { history, location } = props;
      const parseParams = queryStr.parse(location.search);
      const { byType, orderBy } = values;
      delete parseParams.byType;
      delete parseParams.orderBy;
      const stringifyParams = queryStr.stringify(parseParams);

      if (err) {
        return;
      }
      history.push(`/favorite?${stringifyParams}&byType=${byType}&orderBy=${orderBy}`);
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Menu id="extended-sample-panel" mode="inline" theme="dark">
        <Menu.SubMenu title={(
          <span>
            <i className="sub-menu-icon-wrap">
              <img className="sub-menu-icon" src="/svg-icon/filter.svg" alt="filter icon svg" />
            </i>
            Фильтры
          </span>
        )}
        >
          <Form.Item className="extended-form-item extended-form-label">
            Отображать
          </Form.Item>
          <Form.Item className="extended-form-item">
            {
              getFieldDecorator("byType", {
                initialValue: byType || "all"
              })(
                <Select className="extended-panel-select">
                  <Option value="all">Все</Option>
                  <Option value="films">Фильмы</Option>
                  <Option value="series">Сериалы</Option>
                  <Option value="anime">Аниме</Option>
                  <Option value="cartoon">Мультфильмы</Option>
                </Select>
              )
            }
          </Form.Item>

          <Form.Item className="extended-form-item extended-form-label">
            Порядок
          </Form.Item>
          <Form.Item className="extended-form-item">
            {
              getFieldDecorator("orderBy", {
                initialValue: orderBy || "dec"
              })(
                <Select className="extended-panel-select">
                  <Option value="dec">Убыванию</Option>
                  <Option value="inc">Возростанию</Option>
                </Select>
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
};

export default withRouter(
  Form.create({ name: "fort-favorite-movies" })(SortFavoriteByType)
);
