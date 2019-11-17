import React from 'react';
import { Row, Col, Icon } from "antd";

import "./no-access-to-comments.css";

const NoAccessToComments = () => {
  return (
    <Row>
      <div className="no-access-comments">
        <Col>
          <Icon twoToneColor="#ffaf00" type="warning" theme="twoTone" />
        </Col>
        <Col>
          Уважаемый посетитель, Оставлять коментарии могут только зарегистрированные пользователи
          Мы рекомендуем Вам зарегистрироваться либо войти на сайт под своим именем
        </Col>
      </div>
    </Row>
  );
};

export default NoAccessToComments;
