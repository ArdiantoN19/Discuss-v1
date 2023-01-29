import React from "react";
import PropTypes from "prop-types";

const CategoryButton = ({
  threadCategory,
  category,
  handleOnClickCategory,
}) => {
  return (
    <button
      type="button"
      className={`border border-navy py-1 px-3 rounded ${
        category === threadCategory ? "bg-secondary" : ""
      }`}
      onClick={({ target: { value } }) => handleOnClickCategory(value)}
      value={threadCategory}
    >
      #{threadCategory}
    </button>
  );
};

CategoryButton.propTypes = {
  threadCategory: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  handleOnClickCategory: PropTypes.func.isRequired,
};

export default CategoryButton;
