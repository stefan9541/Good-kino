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
    }) => {
      const { userName, picture } = author;
      let [date, time] = createdAt.split("T");
      time = time.slice(0, 8);
      return (
        <React.Fragment key={_id}>
          <Col className="comment-header">
            <div>
              <span className="user-name">
                <Icon type="user" /> {userName}
              </span>
              <small className="comment-date">
                {date} {time}
              </small>
            </div>
          </Col>
          <Col className="comment-body">
            <div className="user-comment-avatar">
              {
                (picture)
                  ? <Avatar src={picture} size={64} />
                  : <Avatar icon="user" size={64} />
              }
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
