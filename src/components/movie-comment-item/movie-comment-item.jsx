import React from "react";
import {
  Col, Icon, Avatar
} from "antd";

import "./movie-comment-item.css";

const MovieCommentItem = props => {
  const { commentaries } = props;
  return (
    (commentaries || []).map(({
      createdAt, author, body, _id
    }, index) => {
      const currentDate = new Date(createdAt)
        .toTimeString();
      return (
        <React.Fragment key={_id + index}>
          <Col className="comment-header">
            <div>
              <span className="user-name">
                <Icon type="user" /> {author}
              </span>
              <small className="comment-date">
                {currentDate}
              </small>
            </div>
          </Col>
          <Col className="comment-body">
            <div className="user-avatar">
              <Avatar size={64} icon="user" />
            </div>
            <div className="comment-text">
              <span>
                {body}
              </span>
            </div>
          </Col>
        </React.Fragment>
      );
    })
  );
};

export default MovieCommentItem;
