import React from "react";
import PropTypes, { string } from "prop-types";
import parse from "html-react-parser";
import { postedAt } from "../utils";
import { UpVote } from "./icons/UpVote";
import { UpVoteFill } from "./icons/UpVoteFill";
import { DownVote } from "./icons/DownVote";
import { DownVoteFill } from "./icons/DownVoteFill";

const ThreadDetail = ({
  title,
  category,
  body,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
  upVote,
  downVote,
}) => {
  const isThreadUpVote = upVotesBy.includes(authUser);
  const isThreadDownVote = downVotesBy.includes(authUser);

  return (
    <>
      <div className="mb-5">
        <span className="py-1 px-2 rounded border border-navy ">
          #{category}
        </span>
      </div>
      <div className="flex items-center justify-start gap-2 mb-3">
        <img
          src={owner?.avatar}
          alt={owner?.name}
          className="rounded-full w-12"
        />
        <div>
          <h3 className="text-base font-semibold">{owner.name}</h3>
          <p className="text-secondary text-sm">{postedAt(createdAt)}</p>
        </div>
      </div>
      <h2 className="font-semibold text-2xl mb-3">{title}</h2>
      <div className=" mb-3 text-base">{parse(body)}</div>
      <div className="flex justify-start items-center py-2 gap-3 mb-1">
        <button
          type="button"
          className="flex items-center gap-1"
          onClick={upVote}
        >
          {isThreadUpVote ? <UpVoteFill /> : <UpVote />} {upVotesBy.length}
        </button>
        <button
          type="button"
          className="flex items-center gap-1"
          onClick={downVote}
        >
          {isThreadDownVote ? <DownVoteFill /> : <DownVote />}{" "}
          {downVotesBy.length}
        </button>
      </div>
    </>
  );
};

ThreadDetail.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.object.isRequired,
  upVotesBy: PropTypes.arrayOf(string).isRequired,
  downVotesBy: PropTypes.arrayOf(string).isRequired,
  authUser: PropTypes.string,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default ThreadDetail;
