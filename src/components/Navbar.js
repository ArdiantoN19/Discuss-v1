import React from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { Thread } from "./icons/Thread";
import { Chart } from "./icons/Chart";
import { Login } from "./icons/Login";

const Navbar = ({ authUser, onLogout }) => {
  return (
    <nav className="container py-2 fixed bottom-0 left-0 border-t border-slate-300 bg-white min-w-full">
      <div className="w-full md:max-w-lg mx-auto">
        <ul className="flex justify-center items-center text-navy gap-8 md:gap-10">
          <Link to="/" className="text-base">
            <div className="flex justify-center">
              <Thread />
            </div>
            Threads
          </Link>
          <Link to="/leaderboards" className="text-base">
            <div className="flex justify-center">
              <Chart />
            </div>
            Leaderboards
          </Link>
          {!authUser ? (
            <Link to="/login" className="text-base">
              <div className="flex justify-center">
                <Login />
              </div>
              Login
            </Link>
          ) : (
            <button className="text-base" type="button" onClick={onLogout}>
              <div className="flex justify-center">
                <Login />
              </div>
              Logout
            </button>
          )}
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  authUser: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
