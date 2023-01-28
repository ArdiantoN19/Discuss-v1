import React from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";

const LoginInput = ({ login }) => {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        type="Email"
        placeholder="Email"
        className="p-2 block w-full border rounded border-slate-300 focus:outline-none focus:border-navy focus:invalid:border-red-500 invalid:border-red-500 mb-3"
        value={email}
        onChange={onEmailChange}
      />
      <input
        type="password"
        placeholder="Password"
        className="p-2 block w-full border rounded border-slate-300 mb-5 focus:outline-none focus:border-navy invalid:border-red-500"
        value={password}
        onChange={onPasswordChange}
        pattern="[A-Za-z0-9]{6,20}$"
      />
      <button
        type="submit"
        name="Login"
        disabled={!(email !== "" && password !== "")}
        className="block w-1/3 mx-auto font-semibold text-base bg-navy bg-opacity-90 p-2 text-light rounded hover:bg-opacity-100"
      >
        Login
      </button>
    </form>
  );
};

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
