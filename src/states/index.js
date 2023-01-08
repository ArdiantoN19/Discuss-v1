import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading-bar";
import authUserReducer from "./authUser/reducer";
import isPreloadReducer from "./isPreload/reducer";
import detailThreadReducer from "./threadDetail/reducer";
import threadsReducer from "./threads/reducer";
import usersReducer from "./users/reducer";
import leaderboardsReducer from "./leaderboards/reducer";
import { thunk } from "./middlewares";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    threadDetail: detailThreadReducer,
    threads: threadsReducer,
    users: usersReducer,
    leaderboards: leaderboardsReducer,
    loadingBar: loadingBarReducer,
  },
  middleware: [thunk],
});

export default store;
