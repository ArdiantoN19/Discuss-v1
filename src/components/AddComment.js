import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";

const AddComment = ({ addComment }) => {
  const { authUser = null } = useSelector((state) => state);
  const [content, onContentChange] = useInput("");

  const handleOnSubmit = () => {
    addComment(content);
  };

  if (authUser === null) {
    return (
      <div>
        <h3>
          <Link to={"/login"} className="font-semibold mr-1 hover:underline">
            Login
          </Link>
          untuk memberi komentar
        </h3>
      </div>
    );
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <textarea
        type="text"
        placeholder="tambah komentar"
        className="p-2 block w-full border rounded border-slate-300 focus:outline-none focus:border-navy focus:invalid:border-red-500 invalid:border-red-500 mb-3 h-28"
        value={content}
        onChange={onContentChange}
      />
      <button
        type="submit"
        // disabled={content !== ""}
        className="block w-full mx-auto font-semibold text-base bg-navy bg-opacity-90 p-2 text-light rounded hover:bg-opacity-100"
      >
        Kirim
      </button>
    </form>
  );
};

AddComment.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default AddComment;
