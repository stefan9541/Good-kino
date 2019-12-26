import React from "react";
import { Col, Table, Divider, Tooltip, Icon } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { fixedEncodeURIComponent } from "../../utils/fixed-encode-uri";
import {
  handleToggleWatchStatus,
  handleDeleteMovieFromContinueWatch
} from "../../actions/user-actions";

import "./continue-watch.css";
import { withGoodKinoService } from "../hoc";

const ContinueWatch = props => {
  const {
    handleToggleWatchStatus,
    handleDeleteMovieFromContinueWatch,
    continueWatch
  } = props;
  const columns = [
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      width: "100px",
      render: text => new Date(text).toJSON().slice(0, 10),
      align: "center"
    },
    {
      title: "Название",
      dataIndex: "title",
      key: "title",
      render: (text, record) => {
        const { type, genre } = record;
        const path = fixedEncodeURIComponent(`${type}/${genre}/${text}`);
        return <Link to={path}>{text}</Link>;
      }
    },
    {
      title: "Действие",
      key: "action",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.isWatch - b.isWatch,
      render: (text, record) => {
        const { isWatch, movieId } = record;
        const icon = isWatch ? "twoTone" : "outlined";
        return (
          <span>
            <Tooltip title="mark as viewed">
              <Icon
                onClick={() => {
                  handleToggleWatchStatus(movieId, !isWatch);
                }}
                style={{ fontSize: "20px" }}
                type="eye"
                twoToneColor="lime"
                theme={icon}
              />
            </Tooltip>
            <Tooltip title="delete movie">
              <Divider
                style={{ width: "2px", height: "20px" }}
                type="vertical"
              />
              <Icon
                onClick={() => handleDeleteMovieFromContinueWatch(movieId)}
                style={{ fontSize: "18px" }}
                type="close-circle"
                theme="twoTone"
              />
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
        dataSource={continueWatch.sort((a, b) => b.date - a.date)}
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

const mapDispatchToProps = (dispatch, props) => {
  const {
    fetchToggleWatchStatus,
    deleteMovieFromContinueWatch
  } = props.goodKinoService;
  return bindActionCreators(
    {
      handleToggleWatchStatus: handleToggleWatchStatus(fetchToggleWatchStatus),
      handleDeleteMovieFromContinueWatch: handleDeleteMovieFromContinueWatch(
        deleteMovieFromContinueWatch
      )
    },
    dispatch
  );
};

export default withGoodKinoService()(
  connect(mapStateToProps, mapDispatchToProps)(ContinueWatch)
);
