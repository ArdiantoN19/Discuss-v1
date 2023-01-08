import React from "react";
import { useDispatch } from "react-redux";
import RegisterInput from "../components/RegisterInput";
import { asyncRegisterUser } from "../states/users/action";

const RegisterPage = () => {
  const dispatch = useDispatch();

  const onRegisterHandler = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
  };

  return (
    <div className="container px-8 py-5 flex items-center justify-center w-full min-h-[80vh]">
      <div className="w-full md:max-w-lg">
        <h2 className="text-3xl font-semibold mb-5 uppercase text-center">
          Register
        </h2>
        <RegisterInput register={onRegisterHandler} />
      </div>
    </div>
  );
};

export default RegisterPage;
