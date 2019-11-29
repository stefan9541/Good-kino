import React from "react";
import {
  Col, Icon, Avatar
} from "antd";
import LikeDislike from "../like-dislike";

import "./movie-comment-item.css";

const MovieCommentItem = props => {
  const {
    commentaries,
    userId,
    toogleLikeOrDislike,
    updateCommentariesLike,
    updateCommentariesDislike
  } = props;
  return (
    (commentaries || []).map(({
      createdAt, author, body, _id, likes, dislikes
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
            <LikeDislike
              commentdId={_id}
              updateCommentariesDislike={updateCommentariesDislike}
              updateCommentariesLike={updateCommentariesLike}
              toogleLikeOrDislike={toogleLikeOrDislike}
              likes={likes}
              dislikes={dislikes}
              userId={userId}
            />
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
