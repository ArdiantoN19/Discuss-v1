import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddThread from "../components/AddThread";
import { asyncAddThread } from "../states/threads/action";

const AddPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnAddThread = ({ title, body, category }) => {
    dispatch(asyncAddThread({ title, body, category }));
    navigate("/");
  };

  return (
    <div className="container px-8">
      <h1 className="text-navy text-2xl font-semibold mb-5">
        Buat diskusi baru
      </h1>
      <AddThread addThread={handleOnAddThread} />
    </div>
  );
};

export default AddPage;
