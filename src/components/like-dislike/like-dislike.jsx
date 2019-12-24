import React from "react";
import { Icon, Tooltip } from "antd";

import "./like-dislike.css";

const LikeDislike = React.memo(props => {
  const {
    likes,
    dislikes,
    userId,
    updateCommentariesLike,
    updateCommentariesDislike,
    toogleLikeOrDislike,
    commentdId
  } = props;
  const isLike = likes.indexOf(userId) !== -1;
  const isDislike = dislikes.indexOf(userId) !== -1;
  return (
    <div className="like-dislike-wrapp">
      <Tooltip title="Like">
        <Icon
          onClick={() => {
            updateCommentariesLike(commentdId, isLike);
            toogleLikeOrDislike("likes", userId, commentdId);
          }}
          type="like"
          twoToneColor="#3cce7b"
          theme={isLike ? "twoTone" : "filled"}
        />
      </Tooltip>
      <span>{likes.length}</span>
      <Tooltip title="Dislike">
        <Icon
          onClick={() => {
            updateCommentariesDislike(commentdId, isDislike);
            toogleLikeOrDislike("dislikes", userId, commentdId);
          }}
          className="dislike"
          type="dislike"
          twoToneColor="#f66"
          theme={isDislike ? "twoTone" : "filled"}
        />
      </Tooltip>
      <span>{dislikes.length}</span>
    </div>
  );
});

export default LikeDislike;
