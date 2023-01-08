import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncSetAuthUser } from "../states/authUser/action";
import LoginInput from "../components/LoginInput";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = ({ email, password }) => {
    dispatch(
      asyncSetAuthUser({
        email,
        password,
      })
    );
    navigate("/");
  };

  return (
    <div className="container px-8 py-5 flex items-center justify-center w-full h-[80vh]">
      <div className="w-full md:max-w-lg">
        <h2 className="text-3xl font-semibold mb-5 uppercase text-center">
          Login
        </h2>
        <LoginInput login={handleLogin} />
        <div className="mt-3">
          <span className="mr-1">Belum punya akun?</span>
          <Link to="/register" className="hover:underline">
            Daftar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
