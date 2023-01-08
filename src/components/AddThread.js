import React from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";

const AddThread = ({ addThread }) => {
  const [title, onTitleChange] = useInput("");
  const [category, onCategoryChange] = useInput("");
  const [body, onBodyChange] = useInput("");

  const handleOnSubmit = () => {
    addThread({ title, body, category });
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        type="text"
        placeholder="Judul"
        className="p-2 block w-full border rounded border-slate-300 focus:outline-none focus:border-navy focus:invalid:border-red-500 invalid:border-red-500 mb-3"
        value={title}
        onChange={onTitleChange}
      />
      <input
        type="text"
        placeholder="Kategori"
        className="p-2 block w-full border rounded border-slate-300 focus:outline-none focus:border-navy focus:invalid:border-red-500 invalid:border-red-500 mb-3"
        value={category}
        onChange={onCategoryChange}
      />
      <textarea
        type="text"
        placeholder="Apa yang kamu pikirkan?"
        className="p-2 block w-full border rounded border-slate-300 focus:outline-none focus:border-navy focus:invalid:border-red-500 invalid:border-red-500 mb-3 h-28"
        value={body}
        onChange={onBodyChange}
      />
      <button
        type="submit"
        disabled={!(title !== "" && category !== "" && body !== "")}
        className="block w-full mx-auto font-semibold text-base bg-navy bg-opacity-90 p-2 text-light rounded hover:bg-opacity-100"
      >
        Buat
      </button>
    </form>
  );
};

AddThread.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default AddThread;
