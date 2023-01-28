/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
import { showLoading, hideLoading } from "react-redux-loading-bar";
import api from "../../utils/api";

const ActionType = {
  SET_AUTH_USER: "authUser/set",
  UNSET_AUTH_USER: "UNSET_AUTH_USER",
};

const setAuthUserActionCreator = (authUser) => {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
};

const unsetAuthUserActionCreator = () => {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
};

const asyncSetAuthUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
      window.location.href = "/";
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
};

const asyncUnsetAuthUser = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    const confirmLogout = confirm("Yakin ingin logout?");
    if (confirmLogout) {
      dispatch(unsetAuthUserActionCreator());
      api.putAccessToken("");
    }
    dispatch(hideLoading());
  };
};

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
