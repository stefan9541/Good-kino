import React from "react";
import { Col, Table, Divider, Tooltip, Icon } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fixedEncodeURIComponent } from "../../utils/fixed-encode-uri";

import "./continue-watch.css";

const columns = [
  {
    title: "Дата",
    dataIndex: "date",
    key: "date",
    render: ((record) => record.slice(0, 10))
  },
  {
    title: "Название",
    dataIndex: "title",
    key: "title",
    render: ((title, record) => {
      const path = fixedEncodeURIComponent(`${record.type}/${record.genre}/${title}`);
      return (
        (
          <Link to={path}>
            {title}
          </Link>
        )
      );
    })
  },
  {
    title: "Действие",
    key: "action",
    render: () => (
      <span>
        <Tooltip title="mark as viewed">
          <Icon style={{ fontSize: "20px" }} type="eye" theme="twoTone" />
        </Tooltip>
        <Tooltip title="delete movie">
          <Divider style={{ width: "2px", height: "20px" }} type="vertical" />
          <Icon style={{ fontSize: "18px" }} type="close-circle" theme="twoTone" />
        </Tooltip>
      </span>
    )
  }
];
const ContinueWatch = ({ user: { continueWatch } }) => {
  return (
    <Col className="table-content">
      <Table
        className="continue-watch-table"
        rowKey={record => record.movieId}
        dataSource={continueWatch}
        columns={columns}
        pagination={false}
        size="small"
        bordered
      />
    </Col>
  );
};

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  };
};

export default connect(mapStateToProps)(ContinueWatch);
