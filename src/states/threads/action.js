import { showLoading, hideLoading } from "react-redux-loading-bar";
import api from "../../utils/api";

const ActionType = {
  RECEIVE_THREADS: "RECEIVE_THREADS",
  ADD_THREAD: "ADD_THREAD",
  TOGGLE_UPVOTE_THREAD: "TOGGLE_UPVOTE_THREAD",
  TOGGLE_DOWNVOTE_THREAD: "TOGGLE_DOWNVOTE_THREAD",
};

const receiveThreadsActionCreator = (threads) => {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
};

const addThreadActionCreator = (thread) => {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
};

const toggleUpVoteActionCreator = ({ threadId, userId }) => {
  return {
    type: ActionType.TOGGLE_UPVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
};

const toggleDownVoteActionCreator = ({ threadId, userId }) => {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
};

// ! Thunk function
const asyncAddThread = ({ title, body, category }) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
};

const asyncToggleUpVote = (threadId) => {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    if (!authUser) {
      alert("Anda harus login dahulu!");
    } else {
      dispatch(toggleUpVoteActionCreator({ threadId, userId: authUser?.id }));
      try {
        await api.upVoteThread(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(toggleUpVoteActionCreator({ threadId, userId: authUser?.id }));
      }
    }

    dispatch(hideLoading());
  };
};

const asyncToggleDownVote = (threadId) => {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    if (!authUser) {
      alert("Anda harus login terlebih dahulu!");
    } else {
      dispatch(toggleDownVoteActionCreator({ threadId, userId: authUser?.id }));

      try {
        await api.downVoteThread(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(
          toggleDownVoteActionCreator({ threadId, userId: authUser?.id })
        );
      }
    }

    dispatch(hideLoading());
  };
};

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleUpVoteActionCreator,
  toggleDownVoteActionCreator,
  asyncAddThread,
  asyncToggleUpVote,
  asyncToggleDownVote,
};
