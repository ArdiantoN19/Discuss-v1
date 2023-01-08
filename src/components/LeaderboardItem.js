import React from "react";
import PropTypes from "prop-types";

const LeaderboardItem = ({ avatar, name, score }) => {
  return (
    <div className="flex justify-between items-center text-lg mb-3">
      <div className="flex items-center gap-2">
        <img src={avatar} alt={name} className="rounded-full w-12" />
        <span>{name}</span>
      </div>
      <p>{score}</p>
    </div>
  );
};

LeaderboardItem.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default LeaderboardItem;
