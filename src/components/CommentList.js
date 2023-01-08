import React from "react";
import PropTypes, { object } from "prop-types";
import CommentItem from "./CommentItem";

const CommentList = ({ comments, authUser, upVote, downVote }) => {
  const commentLength = comments.length;

  return (
    <>
      <h3 className="text-xl mb-3 font-semibold">Komentar ({commentLength})</h3>
      {comments.map((comment) => (
        <CommentItem
          {...comment}
          key={comment.id}
          authUser={authUser}
          upVote={upVote}
          downVote={downVote}
        />
      ))}
    </>
  );
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(object).isRequired,
  authUser: PropTypes.string,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default CommentList;
