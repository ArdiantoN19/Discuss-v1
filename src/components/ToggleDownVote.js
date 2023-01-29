import React from "react";
import PropTypes from "prop-types";
import { DownVote } from "./icons/DownVote";
import { DownVoteFill } from "./icons/DownVoteFill";

const ToggleDownVote = ({ downVoteHandler, isThreadDownVote, downVotesBy }) => {
  return (
    <button
      type="button"
      className="flex items-center gap-1"
      onClick={downVoteHandler}
      title="downVote"
    >
      {isThreadDownVote ? <DownVoteFill /> : <DownVote />}
      {downVotesBy.length}
    </button>
  );
};

ToggleDownVote.propTypes = {
  downVoteHandler: PropTypes.func.isRequired,
  isThreadDownVote: PropTypes.bool.isRequired,
  downVotesBy: PropTypes.array.isRequired,
};

export default ToggleDownVote;
