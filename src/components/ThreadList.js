import React from "react";
import PropTypes, { object } from "prop-types";
import ThreadItem from "./ThreadItem";

const ThreadList = ({ threads, upVote, downVote }) => {
  return (
    <div>
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          upVote={upVote}
          downVote={downVote}
        />
      ))}
    </div>
  );
};

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(object).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default ThreadList;
