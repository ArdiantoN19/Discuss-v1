import React from "react";
import PropTypes from "prop-types";
import { UpVote } from "./icons/UpVote";
import { UpVoteFill } from "./icons/UpVoteFill";

const ToggleUpVote = ({ upVoteHandler, isThreadUpVote, upVotesBy }) => {
  return (
    <button
      type="button"
      className="flex items-center gap-1"
      onClick={upVoteHandler}
      title="upVote"
    >
      {isThreadUpVote ? <UpVoteFill /> : null} {upVotesBy.length}
    </button>
  );
};

ToggleUpVote.propTypes = {
  upVoteHandler: PropTypes.func.isRequired,
  isThreadUpVote: PropTypes.bool.isRequired,
  upVotesBy: PropTypes.array.isRequired,
};

export default ToggleUpVote;
