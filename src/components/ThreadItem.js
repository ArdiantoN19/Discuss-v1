import React from "react";
import PropTypes, { string } from "prop-types";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { postedAt } from "../utils";
import { UpVote } from "./icons/UpVote";
import { UpVoteFill } from "./icons/UpVoteFill";
import { DownVote } from "./icons/DownVote";
import { DownVoteFill } from "./icons/DownVoteFill";

const ThreadItem = ({
  id,
  category,
  upVotesBy,
  downVotesBy,
  user,
  authUser,
  createdAt,
  title,
  body,
  totalComments,
  upVote,
  downVote,
}) => {
  const isThreadUpVote = upVotesBy.includes(authUser);
  const isThreadDownVote = downVotesBy.includes(authUser);

  const handleOnClickUpVoteThread = (e) => {
    e.stopPropagation();
    upVote(id);
  };

  const handleOnClickDownVoteThread = (e) => {
    e.stopPropagation();
    downVote(id);
  };

  return (
    <div className="mb-5 border-b border-slate-300 pt-3">
      <div className="mb-5">
        <span className="border border-navy py-1 px-2 rounded">
          #{category}
        </span>
      </div>
      <div className="flex items-center justify-start gap-2 mb-3">
        <img
          src={user?.avatar}
          alt={user?.name}
          className="rounded-full w-12"
        />
        <div>
          <div className="flex items-center justify-start gap-2 max-w-md">
            <h3 className="text-base font-semibold">{user?.name}</h3>
            <p className="text-secondary text-sm">{user?.email}</p>
          </div>
          <p className="text-secondary text-sm">{postedAt(createdAt)}</p>
        </div>
      </div>
      <Link to={`/threads/${id}`} className="font-semibold text-lg mb-3">
        {title}
      </Link>
      <div className="thread-description mb-3">{parse(body)}</div>

      <div className="flex justify-between items-center py-2 rounded mb-1">
        <div className="flex gap-5">
          <button
            type="button"
            className="flex items-center gap-1"
            onClick={handleOnClickUpVoteThread}
          >
            {isThreadUpVote ? <UpVoteFill /> : <UpVote />} {upVotesBy.length}
          </button>
          <button
            type="button"
            className="flex items-center gap-1"
            onClick={handleOnClickDownVoteThread}
          >
            {isThreadDownVote ? <DownVoteFill /> : <DownVote />}
            {downVotesBy.length}
          </button>
        </div>
        <p className="text-right text-sm text-secondary">
          {totalComments} Komentar
        </p>
      </div>
    </div>
  );
};

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(string).isRequired,
  downVotesBy: PropTypes.arrayOf(string).isRequired,
  category: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  authUser: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
};

export default ThreadItem;
