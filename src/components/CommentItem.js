import React from "react";
import PropTypes, { string } from "prop-types";
import parse from "html-react-parser";
import { postedAt } from "../utils";
import { UpVote } from "./icons/UpVote";
import { UpVoteFill } from "./icons/UpVoteFill";
import { DownVote } from "./icons/DownVote";
import { DownVoteFill } from "./icons/DownVoteFill";

const CommentItem = ({
  id,
  content,
  createdAt,
  downVotesBy,
  upVotesBy,
  owner,
  authUser,
  upVote,
  downVote,
}) => {
  const isCommentUpVote = upVotesBy.includes(authUser);
  const isCommentDownVote = downVotesBy.includes(authUser);

  const handleOnClickUpVoteComment = (e) => {
    e.stopPropagation();
    upVote(id);
  };

  const handleOnClickDownVoteComment = (e) => {
    e.stopPropagation();
    downVote(id);
  };

  return (
    <div className="mb-3 border-b border-slate-300">
      <div className="flex items-center justify-start gap-2 mb-3">
        <img
          src={owner?.avatar}
          alt={owner?.name}
          className="rounded-full w-10"
        />
        <div>
          <h3 className="text-base font-semibold">{owner?.name}</h3>
          <p className="text-secondary text-sm">{postedAt(createdAt)}</p>
        </div>
      </div>
      <div className=" mb-3 text-base">{parse(content)}</div>
      <div className="flex justify-start items-center py-2 gap-3 mb-1">
        <button
          type="button"
          className="flex items-center gap-1"
          onClick={handleOnClickUpVoteComment}
        >
          {isCommentUpVote ? <UpVoteFill /> : <UpVote />} {upVotesBy.length}
        </button>
        <button
          type="button"
          className="flex items-center gap-1"
          onClick={handleOnClickDownVoteComment}
        >
          {isCommentDownVote ? <DownVoteFill /> : <DownVote />}{" "}
          {downVotesBy.length}
        </button>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  downVotesBy: PropTypes.arrayOf(string).isRequired,
  upVotesBy: PropTypes.arrayOf(string).isRequired,
  owner: PropTypes.object.isRequired,
  authUser: PropTypes.string,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default CommentItem;
