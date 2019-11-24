import React from "react";
import { Col, Table, Divider, Tooltip, Icon } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fixedEncodeURIComponent } from "../../utils/fixed-encode-uri";
import { updateMovieStatusToWatched } from "../../actions/user-actions";

import "./continue-watch.css";

const ContinueWatch = props => {
  const {
    updateMovieStatusToWatched,
    continueWatch
  } = props;
  const columns = [
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      width: "100px",
      render: (text => text.slice(0, 10)),
      align: "center"
    },
    {
      title: "Название",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.isWatch - b.isWatch,
      // defaultSortOrder: 'descend',
      // sortOrder: "false",
      render: ((text, record) => {
        const { type, genre } = record;
        const path = fixedEncodeURIComponent(`${type}/${genre}/${text}`);
        return (
          (
            <Link to={path}>
              {text}
            </Link>
          )
        );
      })
    },
    {
      title: "Действие",
      key: "action",
      render: (text, record) => {
        const { isWatch } = record;
        return (
          <span>
            <Tooltip title="mark as viewed">
              <Icon
                onClick={() => {
                  updateMovieStatusToWatched(record.movieId);
                }}
                style={{ fontSize: "20px" }}
                type="eye"
                theme="twoTone"
              />
            </Tooltip>
            <Tooltip title="delete movie">
              <Divider style={{ width: "2px", height: "20px" }} type="vertical" />
              <Icon style={{ fontSize: "18px" }} type="close-circle" theme="twoTone" />
            </Tooltip>
          </span>
        );
      }
    }
  ];

  return (
    <Col className="table-content">
      <Table
        className="continue-watch-table"
        rowKey={record => record.movieId}
        dataSource={continueWatch.reverse()}
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
    continueWatch: state.userReducer.continueWatch
  };
};

const mapDispatchToProps = {
  updateMovieStatusToWatched
};

export default connect(mapStateToProps, mapDispatchToProps)(ContinueWatch);
