import React from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";

const RegisterInput = ({ register }) => {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    register({ name, email, password });
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Name"
          className="p-2 block w-full border rounded border-slate-300 focus:outline-none focus:border-navy focus:invalid:border-red-500 invalid:border-red-500 peer"
          value={name}
          onChange={onNameChange}
          pattern="[A-Za-z0-9]{5,20}$"
        />
        <span className="text-xs text-red-500 hidden peer-invalid:block">
          Name must be 5 character
        </span>
      </div>
      <div className="mb-3">
        <input
          type="Email"
          placeholder="Email"
          className="p-2 block w-full border rounded border-slate-300 focus:outline-none focus:border-navy focus:invalid:border-red-500 invalid:border-red-500 peer"
          value={email}
          onChange={onEmailChange}
        />
        <span className="text-xs text-red-500 hidden peer-invalid:block">
          Must be input a valid email
        </span>
      </div>
      <div className="mb-5">
        <input
          type="password"
          placeholder="Password"
          className="p-2 block w-full border rounded border-slate-300 focus:outline-none focus:border-navy invalid:border-red-500 peer "
          value={password}
          onChange={onPasswordChange}
          pattern="[A-Za-z0-9]{6,20}$"
        />
        <span className="text-xs text-red-500 hidden peer-invalid:block">
          Password must be 6 character
        </span>
      </div>
      <button
        type="submit"
        disabled={!(name !== "" && email !== "" && password !== "")}
        className="block w-1/3 mx-auto font-semibold text-base bg-navy bg-opacity-90 p-2 text-light rounded hover:bg-opacity-100"
      >
        Register
      </button>
    </form>
  );
};

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
