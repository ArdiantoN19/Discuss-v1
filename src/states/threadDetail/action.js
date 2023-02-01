import { showLoading, hideLoading } from "react-redux-loading-bar";
import api from "../../utils/api";

const ActionType = {
  RECEIVE_THREAD_DETAIL: "RECEIVE_THREAD_DETAIL",
  CLEAR_THREAD_DETAIL: "CLEAR_THREAD_DETAIL",
  ADD_COMMENT: "ADD_COMMENT",
  TOGGLE_UPVOTE_THREAD_DETAIL: "TOGGLE_UPVOTE_THREAD_DETAIL",
  TOGGLE_DOWNVOTE_THREAD_DETAIL: "TOGGLE_DOWNVOTE_THREAD_DETAIL",
  TOGGLE_NEUTRALVOTE_THREAD_DETAIL: "TOGGLE_NEUTRALVOTE_THREAD_DETAIL",
  TOGGLE_UPVOTE_COMMENT: "TOGGLE_UPVOTE_COMMENT",
  TOGGLE_DOWNVOTE_COMMENT: "TOGGLE_DOWNVOTE_COMMENT",
};

const receiveThreadDetailActionCreator = (threadDetail) => {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
};

const clearThreadDetailActionCreator = () => {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
};

const addCommentActionCreator = (comment) => {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
};

const toggleUpVoteDetailActionCreator = (userId) => {
  return {
    type: ActionType.TOGGLE_UPVOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
};

const toggleDownVoteDetailActionCreator = (userId) => {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
};

const toggleNeutralVoteDetailActionCreator = (userId) => {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
};

const toggleUpVoteCommentActionCreator = ({ commentId, userId }) => {
  return {
    type: ActionType.TOGGLE_UPVOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
};

const toggleDownVoteCommentActionCreator = ({ commentId, userId }) => {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
};

const asyncReceiveThreadDetail = (threadId) => {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());

    try {
      const threadDetail = await api.getDetailThreads(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.messsage);
    }
    dispatch(hideLoading());
  };
};

const asyncAddComment = (content) => {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const {
      threadDetail: { id },
    } = getState();

    try {
      const comment = await api.createComment({ id, content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.messsage);
    }
    dispatch(hideLoading());
  };
};

const asyncToggleUpVoteDetailThread = () => {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threadDetail } = getState();
    const isDetailThreadUpVote = threadDetail.upVotesBy.includes(authUser?.id);
    const isDetailThreadDownVote = threadDetail.downVotesBy.includes(
      authUser?.id
    );

    if (!authUser) {
      alert("Anda harus login dahulu!");
      return;
    }
    dispatch(toggleUpVoteDetailActionCreator(authUser?.id));

    if (!isDetailThreadUpVote) {
      try {
        await api.upVoteThread(threadDetail.id);
      } catch (error) {
        alert(error.message);
        if (isDetailThreadDownVote) {
          dispatch(toggleDownVoteDetailActionCreator(authUser?.id));
          return;
        }
        dispatch(toggleNeutralVoteDetailActionCreator(authUser?.id));
      }
    } else {
      try {
        await api.neutralizeThreadVote(threadDetail.id);
      } catch (error) {
        alert(error.message);
        dispatch(toggleUpVoteDetailActionCreator(authUser?.id));
      }
    }

    dispatch(hideLoading());
  };
};

const asyncToggleDownVoteDetailThread = () => {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threadDetail } = getState();
    const isDetailThreadUpVote = threadDetail.upVotesBy.includes(authUser?.id);
    const isDetailThreadDownVote = threadDetail.downVotesBy.includes(
      authUser?.id
    );

    if (!authUser) {
      alert("Anda harus login terlebih dahulu!");
      return;
    }
    dispatch(toggleDownVoteDetailActionCreator(authUser?.id));

    if (!isDetailThreadDownVote) {
      try {
        await api.downVoteThread(threadDetail.id);
      } catch (error) {
        alert(error.message);
        if (isDetailThreadUpVote) {
          dispatch(toggleUpVoteDetailActionCreator(authUser?.id));
          return;
        }
        dispatch(toggleNeutralVoteDetailActionCreator(authUser?.id));
      }
    } else {
      try {
        await api.neutralizeThreadVote(threadDetail.id);
      } catch (error) {
        dispatch(toggleDownVoteDetailActionCreator(authUser?.id));
      }
    }

    dispatch(hideLoading());
  };
};

const asyncToggleUpVoteComment = (commentId) => {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const {
      authUser,
      threadDetail: { id },
    } = getState();

    if (!authUser) {
      alert("Anda harus login terlebih dahulu!");
      return;
    }
    dispatch(
      toggleUpVoteCommentActionCreator({ commentId, userId: authUser?.id })
    );

    try {
      await api.upVoteComment(id, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleUpVoteCommentActionCreator({ commentId, userId: authUser?.id })
      );
    } finally {
      window.location.reload();
    }

    dispatch(hideLoading());
  };
};

const asyncToggleDownVoteComment = (commentId) => {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const {
      authUser,
      threadDetail: { id },
    } = getState();
    if (!authUser) {
      alert("Anda harus login terlebih dahulu!");
      return;
    }
    dispatch(
      toggleDownVoteCommentActionCreator({ commentId, userId: authUser?.id })
    );

    try {
      await api.downVoteComment(id, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleDownVoteCommentActionCreator({
          commentId,
          userId: authUser?.id,
        })
      );
    } finally {
      window.location.reload();
    }

    dispatch(hideLoading());
  };
};

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  toggleUpVoteDetailActionCreator,
  toggleDownVoteDetailActionCreator,
  toggleUpVoteCommentActionCreator,
  toggleDownVoteCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteDetailThread,
  asyncToggleDownVoteDetailThread,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
};
